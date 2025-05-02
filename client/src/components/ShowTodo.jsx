import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const ShowTodo = ({ refresh, BASE_URL }) => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState({ title: "", description: "" });
  const [load, setLoad] = useState(false);

  const getTodo = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${BASE_URL}/todos`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setData(res.data.todos);
      }
      setLoad(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, [refresh]);

  // if (load) {
  //   return <h1 className="text-2xl font-semibold">Loading....</h1>;
  // }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/todos/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setData((prevData) => prevData.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleEdit = (todo) => {
    if (editId === todo._id) {
      // If clicking again on the same edit button, close the form
      setEditId(null);
      setEditTodo({ title: "", description: "" });
    } else {
      setEditId(todo._id);
      setEditTodo({ title: todo.title, description: todo.description });
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/todos/${id}`, editTodo, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setData((prevData) =>
          prevData.map((todo) =>
            todo._id === id ? { ...todo, ...editTodo } : todo
          )
        );
        setEditId(null);
        setEditTodo({ title: "", description: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return load ? (
    <h1 className="text-2xl font-semibold">Loading ...</h1>
  ) : (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Todos Lists :)</h1>
      {data.map((todo) => (
        <Card key={todo._id}>
          <CardHeader className="flex justify-between items-center">
            <div className="w-full">
              {editId === todo._id ? (
                <div className="space-y-2 max-w-md">
                  <Input
                    value={editTodo.title}
                    onChange={(e) =>
                      setEditTodo({ ...editTodo, title: e.target.value })
                    }
                  />
                  <Textarea
                    value={editTodo.description}
                    onChange={(e) =>
                      setEditTodo({
                        ...editTodo,
                        description: e.target.value,
                      })
                    }
                  />
                  <Button
                    className="mt-2 cursor-pointer"
                    onClick={() => handleUpdate(todo._id)}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <CardTitle>{todo.title}</CardTitle>
                  <CardDescription>{todo.description}</CardDescription>
                </>
              )}
            </div>
            <div className="flex gap-6 items-start mt-2">
              <GrDocumentUpdate
                className="cursor-pointer"
                size={22}
                onClick={() => toggleEdit(todo)}
              />
              <RiDeleteBin6Fill
                className="cursor-pointer"
                size={24}
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ShowTodo;
