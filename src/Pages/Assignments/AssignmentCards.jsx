import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { upperFirstChar } from "../../utilities.js/utilities";
import { motion } from "framer-motion"


const AssignmentCards = ({assignment, filteredAssignment, setFilteredAssignments}) => {
    
    const {_id, email, title, photo, mark,subject, difficulty } = assignment
    const {user} =useContext(AuthContext)
    const Difficulty = upperFirstChar(difficulty)
    const Subject = upperFirstChar(subject)


    const handleDelete = email =>{
        console.log(email == user.email)
        if(!user){
         swal('Error', 'Please Log In First', 'error')
        }else if(user.email == email){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                console.log(result)
                if (result.isConfirmed) {
                    console.log(_id)
            fetch(`https://assignment-server-sand.vercel.app/assignments/${_id}`,{
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount>0)
                { 
                    swal('Deleted','The assignment has been deleted', 'success')
                    const filtered = filteredAssignment.filter(assignment => assignment._id !== _id)
                    setFilteredAssignments(filtered)
            }
    
            else{
                swal('ERROR','Failed to delete from the cart', 'error')}
            })
    
        }})
        }else{
            swal('Wrong User', 'Only the creator can delete this Assignment', 'error')

        }
    }
    

    return (
            <motion.div  whileHover={{ scale: 1.1 }}  className="mb-10 lg:mb-0">
            <div className="p-2 bg-[#92140c] text-[#FFDDB6] card items-center justify-between h-full gap-5 w-4/5 mx-auto lg:w-96  shadow-xl">
                <div className="w-fit">
                <img className="w-fit rounded-lg" src={photo} alt="Shoes" />
                </div>
                <div className=" text-start w-full flex flex-col gap-2">
                    <div className="flex flex-col gap-2 px-4">
                    <h2 className="lg:card-title text-xl lg:text-3xl">{title}</h2>
                    <p>Marks: {mark}</p>
                    <p>Difficulty: {Difficulty}</p>
                    <p>Subject: {subject == "cse"? subject.toUpperCase():Subject}</p>
                    </div>
                    <div className="card-actions lg:justify-center mb-2">
                    <div className="gap-2 flex flex-col  w-full">
                    <Link  to={`/assignmentDetails/${_id}`} className="btn w-full text-xs lg:text-sm bg-[#FFDDB6] text-black border-2 border-[#FFDDB6]  rounded-lg hover:bg-[#92140c] hover:border-[#FFDDB6] hover:text-[#FFDDB6]">View Assignment</Link>
                    <Link  to={`/updateAssignment/${_id}`} className="btn w-full text-xs lg:text-sm  bg-[#FFDDB6] text-black border-2 border-[#FFDDB6]  rounded-lg hover:bg-[#92140c] hover:border-[#FFDDB6] hover:text-[#FFDDB6]">Update Assignment</Link>
                    {user? <Link  onClick={()=>handleDelete(email)} className="btn w-full text-xs lg:text-sm bg-[#FFDDB6] text-black border-2 border-[#FFDDB6]  rounded-lg hover:bg-[#92140c] hover:border-[#FFDDB6] hover:text-[#FFDDB6]">Delete Assignment</Link>: <div></div>}
                    
                    </div>
                    </div>
                </div>
            </div>
        </motion.div>        
    );
};



export default AssignmentCards;