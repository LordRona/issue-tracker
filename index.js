       //JavaScript code goes here

       const issueForm = document.getElementById('issueForm');

       const issueList = document.getElementById('issueList');

       let issues = [];

       issueForm.addEventListener('submit', (e) => {
           e.preventDefault();

           const title = document.getElementById('title').value;

           const description = document.getElementById('description').value;

           const priority = document.getElementById('priority').value;

           const issue = {
               title,
               description,
               priority,
           };

           issues.push(issue);

           localStorage.setItem('issues', JSON.stringify(issues));

           displayIssues();

           document.getElementById('issueForm').reset();
       });

       function displayIssues() {
           issueList.innerHTML = '';

           for (let i = 0; i < issues.length; i++) {
               const issue = issues[i];

               const row = document.createElement('tr');

               const titleCell = document.createElement('td');

               titleCell.textContent = issue.title;

               const descriptionCell = document.createElement('td');

               descriptionCell.textContent = issue.description;

               const priorityCell = document.createElement('td');

               priorityCell.textContent = issue.priority;

               const actionsCell = document.createElement('td');

               const resolveButton = document.createElement('button');

               resolveButton.textContent = 'Resolve';

               resolveButton.addEventListener('click', () => {
                   resolveIssue(i);
               });

               const deleteButton = document.createElement('button');

               deleteButton.textContent = 'Delete';

               deleteButton.addEventListener('click', () => {
                   deleteIssue(i);
               });

               actionsCell.appendChild(resolveButton);

               actionsCell.appendChild(deleteButton);

               row.appendChild(titleCell);

               row.appendChild(descriptionCell);

               row.appendChild(priorityCell);
               row.appendChild(actionsCell);

               issueList.appendChild(row);
           }
       }

       function resolveIssue(index) {
           issues[index].resolved = true;

           localStorage.setItem('issues', JSON.stringify(issues));

           displayIssues();

           alert('Issue resolved.');

           window.location.reload();
       };

       function deleteIssue(index) {
           issues.splice(index, 1);

           localStorage.setItem('issues', JSON.stringify(issues));

           displayIssues();

           alert('Issue deleted.');
       }

       const searchInput = document.getElementById('searchInput');
       const searchButton = document.getElementById('searchButton');
   
       searchButton.addEventListener('click', function(event) {
         event.preventDefault();
         const searchTerm = searchInput.value.trim().toLowerCase();
         const filteredIssues = issues.filter(function(issue) {
           return issue.title.toLowerCase().includes(searchTerm);
         });
         displayIssues(filteredIssues);
       });