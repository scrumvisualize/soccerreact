import http from "../http-common";


const create = data => {
  console.log("Hello: this is create call from Register");
  return http.post("/register", data);
};

const update = (id, data) => {
  return http.put(`/register/${id}`, data);
};

const remove = id => {
  return http.delete(`/register/${id}`);
};

export default {
  create,
  update,
  remove
};
