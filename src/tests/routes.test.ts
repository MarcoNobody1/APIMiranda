import supertest from 'supertest';
import {app} from '../app';

describe("Post Endpoints", () => {
  it("should login propperly", async () => {
    const res = await supertest(app).post("/login").send({
      user: "admin",
      password: "admin",
    });
    expect(res.statusCode).toEqual(200);
  });
});
