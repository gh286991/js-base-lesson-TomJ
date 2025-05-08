async function loadLearningMap() {
  const response = await fetch('data.json');
  const data = await response.json();
  const container = document.querySelector('.container');
  if (!container) return;
  container.innerHTML = '';

  data.stages.forEach((stage, idx) => {
    // 若 blocks 裡有兩個 block（如基礎語法、資料與操作），就並排顯示
    if (
      stage.id === 'syntax' &&
      Array.isArray(stage.blocks) &&
      stage.blocks.length === 2 &&
      Array.isArray(stage.blocks[0].blocks) &&
      Array.isArray(stage.blocks[1].blocks)
    ) {
      const doubleRow = document.createElement('div');
      doubleRow.className = 'double-stage';

      // 左側
      const leftSection = document.createElement('section');
      leftSection.className = 'stage';
      const leftTitle = document.createElement('h2');
      leftTitle.className = 'stage-title';
      leftTitle.textContent = stage.blocks[0].title;
      leftSection.appendChild(leftTitle);
      const leftRow = document.createElement('div');
      leftRow.className = 'small-row';
      stage.blocks[0].blocks.forEach(block => {
        const blockEl = document.createElement('article');
        blockEl.className = 'small-block';
        blockEl.textContent = block.title;
        leftRow.appendChild(blockEl);
      });
      leftSection.appendChild(leftRow);
      doubleRow.appendChild(leftSection);

      // 右側
      const rightSection = document.createElement('section');
      rightSection.className = 'stage';
      const rightTitle = document.createElement('h2');
      rightTitle.className = 'stage-title';
      rightTitle.textContent = stage.blocks[1].title;
      rightSection.appendChild(rightTitle);
      const rightRow = document.createElement('div');
      rightRow.className = 'small-row';
      stage.blocks[1].blocks.forEach(block => {
        const blockEl = document.createElement('article');
        blockEl.className = 'small-block';
        blockEl.textContent = block.title;
        rightRow.appendChild(blockEl);
      });
      rightSection.appendChild(rightRow);
      doubleRow.appendChild(rightSection);

      container.appendChild(doubleRow);

      // 箭頭（如果不是最後一個）
      if (idx < data.stages.length - 1) {
        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'arrow';
        arrowDiv.innerHTML = `<svg width="24" height="40"><line x1="12" y1="0" x2="12" y2="32" stroke="#fff" stroke-width="2"/><polygon points="6,32 18,32 12,40" fill="#fff"/></svg>`;
        container.appendChild(arrowDiv);
      }
    } else {
      // 其他 stage 正常顯示
      const section = document.createElement('section');
      section.className = 'stage';
      section.id = stage.id;
      const h2 = document.createElement('h2');
      h2.className = 'stage-title';
      h2.textContent = stage.title;
      section.appendChild(h2);
      let row;
      if (stage.blocks.length > 3) {
        row = document.createElement('div');
        row.className = 'small-row';
      } else {
        row = document.createElement('div');
        row.className = 'row';
      }
      stage.blocks.forEach(block => {
        let blockEl;
        if (block.items) {
          blockEl = document.createElement('article');
          blockEl.className = 'block';
          const h3 = document.createElement('h3');
          h3.className = 'block-title';
          h3.textContent = block.title;
          blockEl.appendChild(h3);
          const ul = document.createElement('ul');
          block.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          blockEl.appendChild(ul);
          if (block.link && block.linkText) {
            const a = document.createElement('a');
            a.href = block.link;
            a.textContent = block.linkText;
            blockEl.appendChild(a);
          }
        } else {
          blockEl = document.createElement('article');
          blockEl.className = 'small-block';
          blockEl.textContent = block.title;
        }
        row.appendChild(blockEl);
      });
      section.appendChild(row);
      container.appendChild(section);
      // 箭頭（不是最後一個階段才插入）
      if (idx < data.stages.length - 1) {
        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'arrow';
        arrowDiv.innerHTML = `<svg width="24" height="40"><line x1="12" y1="0" x2="12" y2="32" stroke="#fff" stroke-width="2"/><polygon points="6,32 18,32 12,40" fill="#fff"/></svg>`;
        container.appendChild(arrowDiv);
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', loadLearningMap); 