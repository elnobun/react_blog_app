import {Router} from 'express'
import bodyParser from 'body-parser'
import categories from './categories'
import posts from './posts'
import comments from './comments'

const router = Router();

router.use((request, response, next) => {
  const token = request.get('Authorization');
  if (token) {
    request.token = token;
    next()
  } else {
    const message =
      'Please provide an Authorization header to identify yourself (can be whatever you want)';
    response.status(403).send({error: message})
  }
});

router.get('/categories', (request, response) => {
  categories.getAll(request.token).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.get('/:category/posts', (request, response) => {
  posts.getByCategory(request.token, request.params.category).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.get('/posts', (request, response) => {
  posts.getAll(request.token).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.post('/posts', bodyParser.json(), (request, response) => {
  posts.add(request.token, request.body).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.get('/posts/:id', (request, response) => {
  posts.get(request.token, request.params.id).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.delete('/posts/:id', (request, response) => {
  posts
    .disable(request.token, request.params.id)
    .then(post => {
      comments.disableByParent(request.token, post)
    })
    .then(
      data => response.send(data),
      error => {
        console.error(error);
        response.status(500).send({error: 'There was an error.'})
      }
    )
});

router.post('/posts/:id', bodyParser.json(), (request, response) => {
  const {option} = request.body;
  const id = request.params.id;
  posts.vote(request.token, id, option).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.put('/posts/:id', bodyParser.json(), (request, response) => {
  posts.edit(request.token, request.params.id, request.body).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.get('/posts/:id/comments', (request, response) => {
  comments.getByParent(request.token, request.params.id).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.get('/comments/:id', (request, response) => {
  comments.get(request.token, request.params.id).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.put('/comments/:id', bodyParser.json(), (request, response) => {
  comments.edit(request.token, request.params.id, request.body).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.post('/comments', bodyParser.json(), (request, response) => {
  comments.add(request.token, request.body).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.post('/comments/:id', bodyParser.json(), (request, response) => {
  const {option} = request.body;
  comments.vote(request.token, request.params.id, option).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.delete('/comments/:id', (request, response) => {
  comments.disable(request.token, request.params.id).then(
    data => response.send(data),
    error => {
      console.error(error);
      response.status(500).send({error: 'There was an error.'})
    }
  )
});

router.all('*', (request, response) =>
  response.status(404).send({error: 'Not found.'})
);

export default router
