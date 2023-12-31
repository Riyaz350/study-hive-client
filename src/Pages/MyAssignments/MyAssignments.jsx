import { useContext, useEffect, useState } from "react";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyAssignmentRow from "./MyAssignmentRow";
import axios from "axios";

const MyAssignments = () => {

    const [assignments, setAssignments]= useState([])

    const {user} =useContext(AuthContext)
    useEffect(()=>{

        axios.get(`https://assignment-server-sand.vercel.app/myAssignments?email=${user?.email}`, {withCredentials:true})
        .then(data => setAssignments(data.data))


    },[user?.email])
    return (
        <div>
            <Navbar></Navbar>
                <div className="lg:min-h-screen">
                <h1 className="text-4xl mt-10 text-center text-[#FFDDB6] p-3 rounded-lg bg-[#92140c] w-fit mx-auto">Your Assignments</h1>

                <div className="overflow-x-auto max-w-7xl mx-auto  my-5 ">
                <table className="table w-full">
                    <thead className="text-xl">
                        <tr>
                            <th>Examinee</th>
                            <th>Assignment</th>
                            <th>Total Marks</th>
                            <th>Status</th>
                            <th>Obtained Marks</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    assignments.map(assignment =><MyAssignmentRow key={assignment._id} assignment={assignment}></MyAssignmentRow>)
                    }
                    </tbody>

                </table>
                </div>
                
                </div>
            <Footer></Footer>
        </div>
    );
};

export default MyAssignments;