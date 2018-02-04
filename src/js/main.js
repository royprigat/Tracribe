// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveSubscription);

function saveSubscription(e) {
  // Get form values
  const siteName = document.getElementById('siteName').value;
  const userName = document.getElementById('userName').value;
  const passWord = document.getElementById('passWord').value;
  const siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const subscription = {
    name: siteName,
    uname: userName,
    pass: passWord,
    url: siteUrl
  };

  // Test if subscriptions is null
  if (localStorage.getItem('subscriptions') === null) {
    const subscriptions = [];
    subscriptions.push(subscription);
    // Set to localStorage
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  } else {
    // Get subscriptions from localStorage
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
    subscriptions.push(subscription);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }

  // Clear form
  document.getElementById('myForm').reset();
  // Re-fetch subscriptions
  fetchSubscriptions();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete subscription
function deleteSubscription(url) {
  // Get subscriptions from localStorage
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
  // Loop throught subscriptions
  for (let i = 0; i < subscriptions.length; i += 1) {
    if (subscriptions[i].url === url) {
      // Remove from array
      subscriptions.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

  // Re-fetch subscriptions
  fetchSubscriptions();
}

// Fetch subscriptions
function fetchSubscriptions() {
  // Get subscriptions from localStorage
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
  // Get output id
  const subscriptionsPanel = document.getElementById('subscriptions');

  // Build output
  subscriptionsPanel.innerHTML = '';
  for (let i = 0; i < subscriptions.length; i += 1) {
    const name = subscriptions[i].name;
    const uname = subscriptions[i].uname;
    const pass = subscriptions[i].pass;
    const url = subscriptions[i].url;

    // add to panel
    subscriptionsPanel.innerHTML += '<div class="subscription">' +
      '<div class="title">' + name + '</div>' +
      '<div class="info"><div class="uname"><div>Username:</div><span style="font-weight: 400; padding: 7px">' + uname + '</span></div>' + 
      '<div class="pass"><div>Password:</div><span style="font-weight: 400; padding: 7px">' + pass + '</span></div></div>' +
      '<div class="extra"> <a class="btn btn-default url" target="_blank" href="' + url + '">Visit</a> ' +
      '<a onclick="deleteSubscription(\'' + url + '\')" class="btn btn-danger delete" href="#">-</a></div>' +
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

