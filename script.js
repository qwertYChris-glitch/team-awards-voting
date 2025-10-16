function submitVote() {
  const voterName = document.getElementById('voterName').value.trim();
  const allround = document.getElementById('allround').value;
  const allroundReason = document.getElementById('allroundReason').value.trim();
  const teamSpirit = document.getElementById('teamSpirit').value;
  const teamSpiritReason = document.getElementById('teamSpiritReason').value.trim();

  if (!voterName || !allround || !allroundReason || !teamSpirit || !teamSpiritReason) {
    alert('Please fill in all fields.');
    return;
  }

  const votes = JSON.parse(localStorage.getItem('votes')) || [];
  votes.push(
    { voter: voterName, award: 'Best All-Round Team Player', employee: allround, reason: allroundReason },
    { voter: voterName, award: 'Best Team Spirit', employee: teamSpirit, reason: teamSpiritReason }
  );
  localStorage.setItem('votes', JSON.stringify(votes));

  alert('Your vote has been submitted!');
  document.getElementById('voterName').value = '';
  document.getElementById('allround').value = '';
  document.getElementById('allroundReason').value = '';
  document.getElementById('teamSpirit').value = '';
  document.getElementById('teamSpiritReason').value = '';
}

function viewResults() {
  const pass = document.getElementById('adminPass').value;
  if (pass !== 'admin123') {
    alert('Incorrect password');
    return;
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.style.display = 'block';
  const votes = JSON.parse(localStorage.getItem('votes')) || [];

  const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
  resultsTable.innerHTML = '';

  votes.forEach(vote => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${vote.voter}</td><td>${vote.award}</td><td>${vote.employee}</td><td>${vote.reason}</td>`;
    resultsTable.appendChild(row);
  });

  const winners = {};
  votes.forEach(vote => {
    if (!winners[vote.award]) winners[vote.award] = {};
    winners[vote.award][vote.employee] = (winners[vote.award][vote.employee] || 0) + 1;
  });

  const winnerTable = document.getElementById('winnerTable').querySelector('tbody');
  winnerTable.innerHTML = '';
  Object.keys(winners).forEach(award => {
    let top = { employee: '', votes: 0 };
    for (const [employee, count] of Object.entries(winners[award])) {
      if (count > top.votes) top = { employee, votes: count };
    }
    const row = document.createElement('tr');
    row.innerHTML = `<td>${award}</td><td>${top.employee}</td><td>${top.votes}</td>`;
    winnerTable.appendChild(row);
  });
}
