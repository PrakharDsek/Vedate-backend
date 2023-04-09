import { Task } from "../models/taskSchema.js";

export const createTask = async (req, res) => {
 try {
   const { title, disc } = req.body;

   if ((title, disc)) {
     const newTask = { title: title, disc: disc, user: req.user };
     const task = await Task.create(newTask);
     res.status(201).json({
       success: true,
       message: `creted task of user with id ${req.user._id}`,
     });
   } else {
     res.status(400).json({
       success: false,
       message: "title or discripton is not provided",
     });
   }
 } catch (error) {
   res.status(500).json({
    success: false ,
    message:reportError.message
   })
 }
};


export const getTasks=async(req ,res) => {
  const data=await Task.find(req.use)
  // console.log(data.map((i) => (i.title)));
  if (data) {
    res.status(201).json({
      success: true,
      message: "Successfully got the data of user",
      data:data
    })
  }

}

export const updateTaskStatus=async(req ,res) => {
  try {
     const Taskid = req.params.id;
     console.log(Taskid)
     if (Taskid) {
       const task = await Task.findById(Taskid);
       if (!task) {
         res.status(404).json({ success: false, message: "Task not found" });
       }

       task.isCompleted = !task.isCompleted;
       await task.save();
       res.status(200).json({
        success: true,
        message: "updated successfully",
        data:task
       })
     } else {
       res.status(500).json({
         success: false,
         message: "Internal server error"
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Id not provided",
    })
  }
}

export const deleteTask=async(req ,res)=> {
   try {
     const Taskid = req.params.id;
     const task =await Task.findById(Taskid)
  
     if (task) {
  
        await task.deleteOne()
       res.status(200).json({
         success: true,
         message: "task deleted successfully",
       })
     } else {
       res.status(404).json({
         success: false,
         message: "Task not found",
        });
      }
    } catch (error) {
      console.log(error.message)
      res.status(400).json({
        success: false,
        message: "Id not provided",
     });
   }
}