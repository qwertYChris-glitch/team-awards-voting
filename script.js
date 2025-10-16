const PASSWORD = '1Qwerty@23';
let votes = JSON.parse(localStorage.getItem('votes')) || [];

function submitVote() {
  const voter = document.getElementById('voterName').value.trim();
  const all = document.getElementById('allround').value;
  const allReason = document.getElementById('allroundReason').value.trim();
  const spirit = document.getElementById('teamSpirit').value;
  const spiritReason = document.getElementById('teamSpiritReason').value.trim();

  if (!voter || !all || !allReason || !spirit || !spiritReason) {
    alert('Please fill everything.');
    return;
  }

  votes.push(
    { voter, award: 'Best All-Round Team Player', employee: all, reason: allReason },
    { voter, award: 'Best Team Spirit', employee: spirit, reason: spiritReason }
  );
  localStorage.setItem('votes', JSON.stringify(votes));

  alert('Vote recorded!');
  document.getElementById('voterName').value = '';
  document.getElementById('allround').value = '';
  document.getElementById('allroundReason').value = '';
  document.getElementById('teamSpirit').value = '';
  document.getElementById('teamSpiritReason').value = '';
}

function viewResults() {
  const pass = document.getElementById('adminPass').value;
  if (pass !== PASSWORD) {
    alert('Wrong password!');
    return;
  }
  const tbody = document.getElementById('resultsTable').querySelector('tbody');
  tbody.innerHTML = '';
  votes.forEach(v => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = v.voter;
    row.insertCell(1).innerText = v.award;
    row.insertCell(2).innerText = v.employee;
    row.insertCell(3).innerText = v.reason;
  });

  const counts = {};
  votes.forEach(v => {
    counts[v.award] = counts[v.award] || {};
    counts[v.award][v.employee] = (counts[v.award][v.employee] || 0) + 1;
  });

  const winBody = document.getElementById('winnerTable').querySelector('tbody');
  winBody.innerHTML = '';
  Object.keys(counts).forEach(award => {
    let max = 0, w = '';
    Object.keys(counts[award]).forEach(emp => {
      if (counts[award][emp] > max) {
        max = counts[award][emp];
        w = emp;
      }
    });
    const row = winBody.insertRow();
    row.insertCell(0).innerText = award;
    row.insertCell(1).innerText = w;
    row.insertCell(2).innerText = max;
  });

  document.getElementById('results').style.display = 'block';
}
