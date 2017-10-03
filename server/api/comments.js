import clone from 'clone'
const db = {};

const defaultData = {
  '97b50bbd-c7b1-4b14-a60f-6de3c739cef5': {
    id: '97b50bbd-c7b1-4b14-a60f-6de3c739cef5',
    parentId: 'e2a5df36-c7e7-4809-baf1-be3bf6137286',
    timestamp: 1504310852200,
    body: 'Hi there! I am a COMMENT.',
    author: 'Marge Rowe',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  '5800570f-29b7-40f4-8807-5f38da9078a9': {
    id: '5800570f-29b7-40f4-8807-5f38da9078a9',
    parentId: 'e2a5df36-c7e7-4809-baf1-be3bf6137286',
    timestamp: 1504334813624,
    body: 'Comments. Are. Cool.',
    author: 'Amina Smith',
    voteScore: 3,
    deleted: false,
    parentDeleted: false
  },
  'df522a95-77d6-438f-a92d-62f9296afff7': {
    id: 'df522a95-77d6-438f-a92d-62f9296afff7',
    parentId: 'ee4a09fd-fd87-4585-9b67-3481172d5d73',
    timestamp: 1504341747412,
    body: 'Hi there! I am a COMMENT.',
    author: 'Minerva Wilderman',
    voteScore: 8,
    deleted: false,
    parentDeleted: false
  },
  'd43d0d5e-8336-44fb-92d8-81ea7abdd437': {
    id: 'd43d0d5e-8336-44fb-92d8-81ea7abdd437',
    parentId: 'ee4a09fd-fd87-4585-9b67-3481172d5d73',
    timestamp: 1504354293819,
    body: 'Comments. Are. Cool.',
    author: 'Jeff Botsford',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  '6981824d-a4a8-4237-8d01-5d444347a6ed': {
    id: '6981824d-a4a8-4237-8d01-5d444347a6ed',
    parentId: '3473a296-2c7a-40a3-bdbe-f8d1d058128b',
    timestamp: 1504356036570,
    body: 'Hi there! I am a COMMENT.',
    author: 'Lexi VonRueden',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  '653c23fa-4179-4762-bfb2-256199c8fc65': {
    id: '653c23fa-4179-4762-bfb2-256199c8fc65',
    parentId: '3473a296-2c7a-40a3-bdbe-f8d1d058128b',
    timestamp: 1504371578809,
    body: 'Comments. Are. Cool.',
    author: 'Ruben Herzog',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  }
};

function getData (token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise(resolve => {
    const comments = getData(token);
    const keys = Object.keys(comments);
    const filteredKeys = keys.filter(
      key => comments[key].parentId === parentId && !comments[key].deleted
    );
    resolve(filteredKeys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise(resolve => {
    const comments = getData(token);
    resolve(
      comments[id].deleted || comments[id].parentDeleted ? {} : comments[id]
    )
  })
}

function add (token, comment) {
  return new Promise(resolve => {
    let comments = getData(token);
    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    };
    resolve(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise(resolve => {
    const comments = getData(token);
    const comment = comments[id];
    switch (option) {
      case 'upVote':
        comment.voteScore = comment.voteScore + 1;
        break;
      case 'downVote':
        comment.voteScore = comment.voteScore - 1;
        break;
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    resolve(comment)
  })
}

function disableByParent (token, post) {
  return new Promise(resolve => {
    const comments = getData(token);
    const keys = Object.keys(comments);
    const filteredKeys = keys.filter(key => comments[key].parentId === post.id);
    filteredKeys.forEach(key => (comments[key].parentDeleted = true));
    resolve(post)
  })
}

function disable (token, id) {
  return new Promise(resolve => {
    let comments = getData(token);
    comments[id].deleted = true;
    resolve(comments[id])
  })
}

function edit (token, id, comment) {
  return new Promise(resolve => {
    let comments = getData(token);
    for (let prop in comment) {
      comments[id][prop] = comment[prop]
    }
    resolve(comments[id])
  })
}

export default {get, getByParent, add, vote, disableByParent, disable, edit}
