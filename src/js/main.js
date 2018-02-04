// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // Get form values
  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();
  // Re-fetch bookmarks
  fetchBookmarks();
  // Hide modal
  $('#addSubModal').modal('toggle');
  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for (let i = 0; i < bookmarks.length; i += 1) {
    if (bookmarks[i].url === url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  const subscriptions = document.getElementById('subscriptions');

  // Build output
  subscriptions.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i += 1) {
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    subscriptions.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger delete" href="#">-</a> ' +
      '</h3>' +
      '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  const expression = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
