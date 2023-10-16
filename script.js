'use strict';

import { tweetsData } from "./data.js";

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');


document.addEventListener('click', (e) => {
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    };
});

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId
    })[0]
    targetTweetObj.likes++;
    // clearDiv('feed')
    
    // render();
};

function clearDiv(element) {
    document.getElementById(element).innerHTML = "";
}


function createElementType(element) {
    return document.createElement(element); 
 };

function createElAddClassAppend(elClass, elType, parent) {
    let el =  createElementType(elType)
    el.className = elClass;
    appendEl(parent, el);
    return el;
    
};

function appendEl(parent,child) {
    return parent.append(child);
};



function getFeedHTML() {
 
    const fragment = new DocumentFragment();
     

    tweetsData.forEach(function(tweets) {
    
    const tweetContainer = createElAddClassAppend('tweet', 'div', fragment);
    const tweetInner = createElAddClassAppend('tweet-inner', 'div', tweetContainer);
    const img = createElAddClassAppend('profile-pic', 'img', tweetInner);
    const div = createElementType('div')
    const tweetHandle = createElAddClassAppend('handle', 'p', div);
    const tweetText = createElAddClassAppend('tweet-text', 'p', div);
    const tweetDetails = createElAddClassAppend('tweet-details', 'div', div);
    const messageContainer = createElAddClassAppend('iconContainer', 'div', tweetDetails);
    const replies = createElAddClassAppend('tweet-detail', 'span', messageContainer);
    const likesContainer = createElAddClassAppend('iconContainer', 'div', tweetDetails);
    let likes = createElAddClassAppend('tweet-detail', 'span', likesContainer);
    const retweetsContainer = createElAddClassAppend('iconContainer', 'div', tweetDetails);
    const reTweets = createElAddClassAppend('tweet-detail', 'span', retweetsContainer);
    let messageIcon = document.createElement('i');
    let likesIcon = document.createElement('i');
    let retweetsIcon = document.createElement('i');
    

    setAttribute(img, 'src', `${tweets.profilePic}`);
    

    setAttribute(messageIcon, 'class', 'fa-regular fa-comment-dots');
    setAttribute(messageIcon, 'data-reply', `${tweets.uuid}`);

    setAttribute(likesIcon, 'class', 'fa-solid fa-heart');
    setAttribute(likesIcon, 'data-like', `${tweets.uuid}`);

    setAttribute(retweetsIcon, 'class', 'fa-solid fa-retweet');
    setAttribute(retweetsIcon, 'data-retweet', `${tweets.uuid}`);

    tweetHandle.textContent = `${tweets.handle}`;
    tweetText.textContent = `${tweets.tweetText}`;
    replies.textContent = `${tweets.replies.length}`;
    likes.textContent = `${tweets.likes}`;
    reTweets.textContent = `${tweets.retweets}`;

     
    tweetInner.append(div);
    messageContainer.append(messageIcon);
    likesContainer.append(likesIcon);
    retweetsContainer.append(retweetsIcon); 
    })

    feed.append(fragment); 
};


function render() {
    getFeedHTML();

};

render();



function setAttribute(element, key, value) {
    element.setAttribute(key, value);
}

