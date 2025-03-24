/**
 * Модуль для переключения табов в секции "Абонементы"
 */
export const initPriceTabs = () => {
  const tabButtons = document.querySelectorAll('.price__tab-button');
  const tabItems = document.querySelectorAll('.price__tab-item');

  if (!tabButtons.length || !tabItems.length) {
    return;
  }

  const switchTab = (tabId) => {
    tabButtons.forEach((button) => {
      button.classList.remove('price__tab-button--active');
    });

    tabItems.forEach((item) => {
      item.classList.remove('price__tab-item--active');
    });

    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) {
      activeButton.classList.add('price__tab-button--active');
    }

    const activeTab = document.getElementById(tabId.replace('#', ''));
    if (activeTab) {
      activeTab.classList.add('price__tab-item--active');
    }
  };

  tabButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const tabId = button.getAttribute('data-tab');
      if (tabId) {
        switchTab(tabId);
      }
    });
  });

  const defaultActiveButton = document.querySelector('.price__tab-button--active');
  if (defaultActiveButton) {
    const defaultTabId = defaultActiveButton.getAttribute('data-tab');
    if (defaultTabId) {
      const defaultActiveTab = document.getElementById(defaultTabId.replace('#', ''));
      if (defaultActiveTab && !defaultActiveTab.classList.contains('price__tab-item--active')) {
        defaultActiveTab.classList.add('price__tab-item--active');
      }
    }
  }
};


