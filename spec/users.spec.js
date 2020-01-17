const user = require("./user");
const func = require("../routes/api/users");

test("Check if the total is equal to 8", () => {
  const total = user(5, 5);
  expect(total).toEqual(10);
});

test("Check if user is null", () => {
  expect(func.isNull()).toBeNull();
});

// test("check the get user", () => {
//   expect.assertions(0);
//   return func.getUsers().then(res => {
//     expect(res).toBeNull();
//   });
// });
// test("check the get user using await", async () => {
//   // expect.assertions(1);
//   const res = func.getUsers;
//   expect(res.router).toContain("staty");
// });
