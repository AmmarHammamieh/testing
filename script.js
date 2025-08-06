var myStorage = localStorage;
var element = "";
function addStylesheet(href, callback) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;

  link.onload = () => {
    console.log('Stylesheet loaded!');
    callback();
  };

  link.onerror = () => {
    console.error('Stylesheet failed to load');
    // Still call callback or handle error as needed
    callback();
  };

  document.head.appendChild(link);
}
function createChatWidget() {
  // Create main container
  const floatingChat = document.createElement('div');
  floatingChat.className = 'floating-chat';

  // Create the chat icon (FontAwesome)
  const chatIcon = document.createElement('i');
  chatIcon.className = 'fa fa-comments';
  chatIcon.setAttribute('aria-hidden', 'true');
  floatingChat.appendChild(chatIcon);

  // Create chat container
  const chat = document.createElement('div');
  chat.className = 'chat';

  // Header
  const header = document.createElement('div');
  header.className = 'header';

  const title = document.createElement('span');
  title.className = 'title';
  title.textContent = "what's on your mind?";

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';

  header.appendChild(title);
  header.appendChild(closeBtn);

  // Messages list
  const messages = document.createElement('ul');
  messages.className = 'messages';

  // Footer with input and send button
  const footer = document.createElement('div');
  footer.className = 'footer';

  const input = document.createElement('input');
  input.className = 'text-box';

  const sendBtn = document.createElement('button');
  sendBtn.id = 'sendMessage';
  sendBtn.textContent = 'send';

  footer.appendChild(input);
  footer.appendChild(sendBtn);

  // Assemble chat
  chat.appendChild(header);
  chat.appendChild(messages);
  chat.appendChild(footer);

  floatingChat.appendChild(chat);

  // Add everything to body
  document.body.appendChild(floatingChat);
  setTimeout(function() {
    floatingChat.classList.add('enter');
  }, 1000);
  floatingChat.addEventListener('click', openElement);
}
addStylesheet('https://raw.githubusercontent.com/AmmarHammamieh/testing/main/script.css', () => {
  createChatWidget();
  element = document.getElementsByClassName('floating-chat')[0];
});


if (!myStorage.getItem('chatID')) {
    myStorage.setItem('chatID', createUUID());
}



function openElement() {
    var messages = element.querySelector('.messages');
    const initialMessages = [
      { sender: 'other', text: 'asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas' },
      { sender: 'other', text: 'Are we dogs??? 🐶' },
      { sender: 'self', text: "no... we're human" },
      { sender: 'other', text: 'are you sure???' },
      { sender: 'self', text: 'yes.... -___-' },
      { sender: 'other', text: "if we're not dogs.... we might be monkeys 🐵" },
      { sender: 'self', text: 'i hate you' },
      { sender: 'other', text: "don't be so negative! here's a banana 🍌" },
      { sender: 'self', text: '......... -___-' },
    ];
    initialMessages.forEach(msg => {
      const li = document.createElement('li');
      li.className = msg.sender;
      li.textContent = msg.text;
      messages.appendChild(li);
    });
    element.querySelectorAll(':scope > i').forEach(iElem => {
      iElem.style.display = 'none'; // hide element
    });
    console.log(element,"element")
    element.classList.add('expand');
    element.querySelector('.chat').classList.add('enter');
    element.removeEventListener('click', openElement);
    element.querySelector('.header button').addEventListener('click', closeElement);
    element.querySelector('#sendMessage').addEventListener('click', sendNewMessage);
    messages.scrollTop = messages.scrollHeight;
}

function closeElement() {
    element.querySelector('.chat').classList.remove('enter');
    element.querySelector('.chat').style.display = 'none';
    element.querySelector(':scope > i').style.display = 'block';
    element.classList.remove('expand');
    element.querySelector('.header button').removeEventListener('click', closeElement)
    element.querySelector('#sendMessage').removeEventListener('click', sendNewMessage)
    setTimeout(function() {
        element.querySelector('.chat').classList.remove('enter')
        element.querySelector('.chat').style.display = 'flex';
        element.addEventListener('click', openElement);
    }, 500);
}

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function sendNewMessage() {
    var userInput =  document.getElementsByClassName('text-box')[0];
    var newMessage = userInput.value.trim();

    if (!newMessage) return;

    var messagesContainer =  document.getElementsByClassName('messages')[0];

    messagesContainer.insertAdjacentHTML('beforeend', '<li class="other">' + newMessage + '</li>');

    userInput.value="";

    animateScrollToBottom(messagesContainer);
}

function animateScrollToBottom(element, duration = 250) {
  const start = element.scrollTop;
  const end = element.scrollHeight;
  const distance = end - start;
  const startTime = performance.now();

  function scroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    element.scrollTop = start + distance * progress;

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}


function onMetaAndEnter(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
    }
}
