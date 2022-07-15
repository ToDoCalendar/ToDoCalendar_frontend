# README

**Documentation languages**:

- [English](README.md)
- [Русский](README-ru.md)

**Menu**:

- [Task](#task)
- [How to run app](#how-to-run-app)
- [Application stack](#application-stack)
- [Folder structure](#folder-structure)

## Task

- [Google Documents](https://docs.google.com/document/d/1UQgKfPkB8C36dyDDmPU40rjSw3_fXEH8/edit)

## How to run app

We start backend:

```bash
git clone https://github.com/ToDoCalendar/ToDoCalendar_server.git
#git clone git@github.com:ToDoCalendar/ToDoCalendar_server.git
cd ToDoCalendar_server
cp .env.example .env
docker-compose up -d
docker-compose ps
```

We start frontend:

```bash
git clone https://github.com/ToDoCalendar/ToDoCalendar_frontend.git
#git clone git@github.com:ToDoCalendar/ToDoCalendar_frontend.git
cd ToDoCalendar_frontend
npm ci
cp .env.example .env
npm run start
```

## Application stack

- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - code editor
- **[Node JS](https://nodejs.org/en/)** - for application development
- **[React](https://reactjs.org/)** - frontend framework
- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - browser
- **[SVG repo](https://www.svgrepo.com/)** - SVG icons
- **[Docker, docker-compose](https://www.docker.com/)** - to run on the server

## Folder structure

```bash
sudo apt install tree
tree --charset ascii -I "node_modules|build" -d
```

```
.
|-- public
`-- src
    |-- components
    |   |-- Container
    |   |-- DatePage
    |   |-- Error404Page
    |   |-- FooterPattern
    |   |-- Headers
    |   |-- HomeRedirectPage
    |   |-- MonthPage
    |   |-- SignPage
    |   |-- TaskPage
    |   `-- YearPage
    |-- consts
    |-- scripts
    |   |-- Sign
    |   |-- Task
    |   |-- Toast
    |   |-- Verify
    |   `-- sleep
    `-- svg

21 directories
```

- **components**:
  - **Description**: A folder with components that can be used several times
  - **Types of files**:
    - `*.jsx`
    - `*.module.css`
- **consts**:
  - **Description**: folder with constants
  - **Types of files**:
    - `*.css`
- **scripts**:
  - **Description**: A folder with application scripts that are repeated on
    several pages
  - **Types of files**:
    - `*.js`
- **svg**
  - **Description**: Icon folder
  - **Types of files**:
    - `*.svg`
