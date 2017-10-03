import clone from 'clone'

const db = {};

const defaultData = {
  'e2a5df36-c7e7-4809-baf1-be3bf6137286': {
    id: 'e2a5df36-c7e7-4809-baf1-be3bf6137286',
    timestamp: 1504318576708,
    title: ' Udacity React/Redux course',
    body: `Everyone says so after all.`,
    author: 'Mose Jast',
    category: 'udacity',
    voteScore: 6,
    deleted: false
  },

  'ee4a09fd-fd87-4585-9b67-3481172d5d73': {
    id: 'ee4a09fd-fd87-4585-9b67-3481172d5d73',
    timestamp: 1486964116626,
    title: 'Learn Redux in 10 minutes!',
    body: `Just kidding. It takes more than 10 minutes to learn technology.`,
    author: 'Felicita Blick',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  'a0bbcaa4-2362-4556-9a69-652e1d3c72f1': {
    id: 'a0bbcaa4-2362-4556-9a69-652e1d3c72f1',
    timestamp: 1487832081761,
    title: 'Learn React in 10 minutes!',
    body: `So far so good React is just a tip of the ice burg.`,
    author: 'Maudie Koelpin',
    category: 'react',
    voteScore: 12,
    deleted: false
  },
};

function getData (token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise(resolve => {
    const posts = getData(token);
    const keys = Object.keys(posts);
    const filteredKeys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted
    );
    resolve(filteredKeys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise(resolve => {
    const posts = getData(token);
    resolve(posts[id].deleted ? {} : posts[id])
  })
}

function getAll (token) {
  return new Promise(resolve => {
    const posts = getData(token);
    const keys = Object.keys(posts);
    const filteredKeys = keys.filter(key => !posts[key].deleted);
    resolve(filteredKeys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise(resolve => {
    const posts = getData(token);
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    };
    resolve(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise(resolve => {
    const posts = getData(token);
    const post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    resolve(post)
  })
}

function disable (token, id) {
  return new Promise(resolve => {
    let posts = getData(token);
    posts[id].deleted = true;
    resolve(posts[id])
  })
}

function edit (token, id, post) {
  return new Promise(resolve => {
    let posts = getData(token);
    for (let prop in post) {
      posts[id][prop] = post[prop]
    }
    resolve(posts[id])
  })
}

export default {get, getAll, getByCategory, add, vote, disable, edit}
