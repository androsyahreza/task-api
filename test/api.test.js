const expect = require("chai").expect;
const request = require("supertest");
const app = require("../src/server");
const TaskService = require("../src/app/services/task.service");

describe("Testing Tasks API", () => {
  it("Should return hello world 👋", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
    expect(res.text).to.equals("Hello World! 👋");
  });

  describe("POST /api/tasks", () => {
    it("Should add a new task", async () => {
      const res = await request(app).post("/api/tasks").send({
        title: "Task 1",
        description: "Do something",
        is_finished: false,
      });
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Task Successfully Added");
    });
  });
  
  describe("GET /api/tasks", () => {
    it("Should return a list of tasks", async () => {
      await TaskService.AddTask({
        title: "Task 1",
        description: "Do something",
        is_finished: false,
      });
      await TaskService.AddTask({
        title: "Task 2",
        description: "Do something else",
        is_finished: true,
      });

      const res = await request(app).get("/api/tasks");
      expect(res.status).to.equal(200);
      expect(res.body.data.length).to.be.above(0);
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("Should return a single task by ID", async () => {
      const newTask = await TaskService.AddTask({
        title: "Task 1",
        description: "Do something",
        is_finished: false,
      });

      const res = await request(app).get(`/api/tasks/${newTask.id}`);
      expect(res.status).to.equal(200);
      expect(res.body.data.title).to.equal("Task 1");
      expect(res.body.data.description).to.equal("Do something");
      expect(res.body.data.is_finished).to.be.false;
    });

    it("Should return an error if task ID is not found", async () => {
      const res = await request(app).get("/api/tasks/1234");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Task Not Found!");
    });
  });

  describe("PATCH /api/tasks/:id", () => {
    it("Should return an error if task ID is not found", async () => {
      const res = await request(app).get("/api/tasks/1234");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Task Not Found!");
    });
    it("Should update the task if it exists", async () => {
      const newTask = await TaskService.AddTask({
        title: "Task 1",
        description: "Do something",
        is_finished: false,
      });
      const res = await request(app).patch(`/api/tasks/${newTask.id}`).send({
        title: "Task 1",
        description: "Do something",
        is_finished: true,
      });
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Task Successfully Patched!");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("Should return an error if task ID is not found", async () => {
      const res = await request(app).get("/api/tasks/1234");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Task Not Found!");
    });

    it("Should delete the task if it exists", async () => {
      const newTask = await TaskService.AddTask({
        title: "Task 1",
        description: "Do something",
        is_finished: true,
      });
      const res = await request(app).delete(`/api/tasks/${newTask.id}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Task Successfully Deleted!");
    });
  });
});
