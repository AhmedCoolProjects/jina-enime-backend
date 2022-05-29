# jina-enime-express

## GET

- `/api`: welcome page
- `/api/student/all`: list of all students in db
- `/api/student/:id`: student infos where his id is `id`
- `/api/worker/all`: list of all workers in db
- `/api/worker/:id`: worker infos where his id is `id`
- `/api/complaint/all`: list of all complaints in db
- `/api/complaint/:id`: complaint infos where his id is `id`

## ADD

- `/api/student`: _(post)_ add student
- `/api/worker`: _(post)_ add worker
- `/api/complaint`: _(post)_ add complaint

## UPDATE

- `/api/student/update/:id`: _(post)_ update student where id is `id`
- `/api/worker/update/:id`: _(post)_ update worker where id is `id`
- `/api/complaint/update/:id`: _(post)_ update complaint where id is `id`

## DELETE

- `/api/student/delete/:id`: _(post)_ delete student where id is `id`
- `/api/worker/delete/:id`: _(post)_ delete worker where id is `id`
- `/api/complaint/delete/:id`: _(post)_ delete complaint where id is `id`
