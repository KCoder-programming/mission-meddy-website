/**
 * Mission Meddy — Static Site Vanilla JavaScript
 * Handles mobile navigation, spoiler lock gate, chapter accordion,
 * clipboard copy tools.
 */

const store = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable - ignore */
    }
  },
};

// Clipboard copy with a fallback for http:// / file:// pages where navigator.clipboard is unavailable.
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
    } catch (e) {
      reject(e);
    } finally {
      document.body.removeChild(ta);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Dynamic Year
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // 3. Spoiler Lock System (on story.html)
  const spoilerLockGate = document.getElementById('spoilerLockGate');
  const spoilerUnlockedContent = document.getElementById('spoilerUnlockedContent');
  const spoilerConfirm = document.getElementById('spoilerConfirm');
  const unlockSpoilersBtn = document.getElementById('unlockSpoilersBtn');
  const relockSpoilersBtn = document.getElementById('relockSpoilersBtn');

  if (spoilerLockGate && spoilerUnlockedContent) {
    const isUnlocked = store.get('mm_static_spoilers') === 'true';

    function setSpoilerState(unlocked) {
      if (unlocked) {
        spoilerLockGate.style.display = 'none';
        spoilerUnlockedContent.style.display = 'block';
        store.set('mm_static_spoilers', 'true');
      } else {
        spoilerLockGate.style.display = 'block';
        spoilerUnlockedContent.style.display = 'none';
        store.set('mm_static_spoilers', 'false');
        if (spoilerConfirm) spoilerConfirm.checked = false;
        if (unlockSpoilersBtn) {
          unlockSpoilersBtn.disabled = true;
          unlockSpoilersBtn.style.opacity = '0.5';
          unlockSpoilersBtn.style.cursor = 'not-allowed';
        }
      }
    }

    // Chapter links from other pages (story.html#revenge-ready) only work once the content is visible.
    function scrollToHash() {
      if (!window.location.hash) return;
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView();
    }

    setSpoilerState(isUnlocked);
    if (isUnlocked) scrollToHash();

    if (spoilerConfirm && unlockSpoilersBtn) {
      spoilerConfirm.addEventListener('change', () => {
        if (spoilerConfirm.checked) {
          unlockSpoilersBtn.disabled = false;
          unlockSpoilersBtn.style.opacity = '1';
          unlockSpoilersBtn.style.cursor = 'pointer';
        } else {
          unlockSpoilersBtn.disabled = true;
          unlockSpoilersBtn.style.opacity = '0.5';
          unlockSpoilersBtn.style.cursor = 'not-allowed';
        }
      });

      unlockSpoilersBtn.addEventListener('click', () => {
        setSpoilerState(true);
        scrollToHash();
      });
    }

    if (relockSpoilersBtn) {
      relockSpoilersBtn.addEventListener('click', () => {
        setSpoilerState(false);
        spoilerLockGate.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // 4. Chapter Accordion Toggles (story.html)
  document.querySelectorAll('[data-accordion-toggle]').forEach((btn) => {
    btn.setAttribute('aria-controls', btn.getAttribute('data-accordion-toggle'));
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-accordion-toggle');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const isOpen = targetEl.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
        const count = btn.getAttribute('data-count') || '';
        const bookName = btn.getAttribute('data-book') || '';
        btn.querySelector('span').textContent = isOpen
          ? `Hide ${bookName} Chapter Scripts (${count} Chapters)`
          : `Read Complete ${bookName} Chapter Scripts (${count} Chapters)`;
      }
    });
  });

  // 5. 1-Click Clipboard Copy (downloads.html & licenses.html)
  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const textToCopy = targetEl.textContent || targetEl.value;
        copyText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied to Clipboard!';
          btn.style.color = '#d7ad64';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
          }, 2500);
        }).catch(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copy failed - select the text manually';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2500);
        });
      }
    });
  });

  // 6. Community Roadmap Voting (development.html)
  //    DORMANT: the voting UI on development.html is commented out (see FUTURE-BLOCKS.md).
  //    This code does nothing until the [data-vote-item] buttons are put back.
  const votesKey = 'mm_static_votes';
  let savedVotes = {};
  try {
    savedVotes = JSON.parse(store.get(votesKey) || '{}');
  } catch (e) {
    savedVotes = {};
  }

  document.querySelectorAll('[data-vote-item]').forEach((btn) => {
    const itemId = btn.getAttribute('data-vote-item');
    const countEl = document.querySelector(`[data-vote-count="${itemId}"]`);
    const initialCount = parseInt(countEl?.getAttribute('data-initial') || '0', 10);

    function updateVoteUI() {
      const isVoted = !!savedVotes[itemId];
      if (countEl) countEl.textContent = String(initialCount + (isVoted ? 1 : 0));
      btn.textContent = isVoted ? 'Voted' : 'Upvote';
      if (isVoted) {
        btn.style.background = '#d7ad64';
        btn.style.color = '#17120b';
      } else {
        btn.style.background = '';
        btn.style.color = '';
      }
    }

    updateVoteUI();

    btn.addEventListener('click', () => {
      savedVotes[itemId] = !savedVotes[itemId];
      store.set(votesKey, JSON.stringify(savedVotes));
      updateVoteUI();
    });
  });
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
