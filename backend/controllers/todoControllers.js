import {
    request,
    response
} from "express";
import mongoose, { mongo } from "mongoose";
import todoModel from "../models/todoModel.js";

export const getAllTodo = async (request, response) => {
    try {
       const todos = await todoModel.find({})
       if (todos) {
        response.status(201).send(todos)
       }

    } catch (error) {
        response.status(404).send({
            message: error.message
        })
    }
}
export const getSingleTodo = async (request, response) => {
    try {
        const {id} = request.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return  response.status(404).send({error:"Invalid id"})
        }
        const todo = await todoModel.findById(id)
        if (!todo) {
          return  response.status(404).send({error:"no such todo"})
        }
        response.status(201).send(todo)
    } catch (error) {
        response.status(404).send({
            message: error.message
        })
    }
}
export const createTodo = async (request, response) => {
    try {
     const {title} = request.body
     const newTodo = await todoModel.create({title})
     response.status(201).send(newTodo)

    } catch (error) {
        response.status(404).send({
            message: error.message
        })
    }
}
export const deleteTodo = async (request, response) => {
    try {
        const {id} = request.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).send({error:"invalid id"})
        }

        const todo = await todoModel.findByIdAndDelete(id)

        if (!todo) {
            return response.status(404).send({error:"no such todo"})
        }
        response.status(201).send(todo)
    } catch (error) {
        response.status(404).send({
            message: error.message
        })
    }
}
export const updateTodo = async (request, response) => {
    try {
        const {id} = request.params
        const {title} = request.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).send({error:"invalid id"})
        }

        const todo = await todoModel.findByIdAndUpdate({_id:id},{title:title})

        if (!todo) {
            return response.status(404).send({error:"no such todo"})
        }

        response.status(201).send(todo)
    } catch (error) {
        response.status(404).send({
            message: error.message
        })
    }
}