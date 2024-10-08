import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import access from '../assets/access.png';


const AdminHome = () => {

	const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	const [admin, setAdmin] = useState(false);
    const id = localStorage.getItem('adminId')
	const navigate = useNavigate();

	useEffect(()=>{
		axios.get("http://localhost:5000/items")
			.then((res)=> setProducts(res.data))
			.catch((err)=> console.error(err))

		axios.get("http://localhost:5000/users")
			.then((res)=> setUsers(res.data.filter((user,index)=> user.isAdmin !== true)))
			.catch((err)=> console.error("aaaa",err))
	},[])

	useEffect(()=>{
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res)=>{
                if(res.data?.isAdmin){
                    setAdmin(true)
                }
            })
            .catch((err)=> console.error(err))
    },[id])

	if(!id && !admin){
        return(
            <div className='flex justify-center'>
                <div className='text-center h-96 w-96 shadow-sm'>
                    <img className='w-96 mt-44' src={access} alt="access denied" />
                    <p className='text-red-500 font-bold text-2xl font-serif'>You don't have permission</p>
                    <p className='text-red-500 font-bold text-2xl font-serif'>to access this page !!</p>
                </div>
            </div>
        )
    }

  return (
    <div className="flex justify-start">
		<div>
			<SideBar />
		</div>
	<div>
		
	<div className="flex justify-center my-20 mt-20 md:ms-64 ms-24">
      <div className="w-5/6 space-y-10 md:space-y-0 md:flex block space-x-2">

	    {/* Product Details */}
        <div className="md:w-1/2 w-full space-y-4 bg-slate-100 border rounded-lg shadow-lg p-2">
			<h1 style={{color:'#052560'}} className="text-center font-bold text-xl">Product Details</h1>
			<div className="space-y-5  max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{products.map((item, index)=>(
				<div
					onClick={()=> navigate(`/admin/productdetails/${item.id}`)}
					key={item.id}
					className="bg-white flex justify-start items-center p-3 border rounded-lg shadow space-x-2 hover:bg-slate-200">
					<img 
						className="h-20 w-auto" 
						src={item.url} alt="img" />
					<div>
						<h1 className="font-semibold">{item.heading}</h1>
						<p className="font-semibold">Price: $ <span className="font-bold text-green-600">{item.price}</span></p>
						<p className="font-semibold">⭐ {item.rating}</p>
					</div>
				</div>
			))}
			
			</div>
			<div className="flex justify-center space-x-3">
				<button 
					onClick={()=> navigate("/admin/addnewproduct")}
					className="bg-green-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-green-700 transition">
					Add New Product
				</button>
				<button 
					onClick={()=> navigate('/admin/categories')}
					className="bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
					View By Category
				</button>
			</div>
		</div>




		{/* User Details */}
        <div className="md:w-1/2 w-full space-y-4 bg-slate-100 border rounded-lg shadow-lg p-2">
			<h1 style={{color:'#052560'}} className="font-bold text-center text-xl">User Details</h1>
			<div className="space-y-5  max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{users.map((user,index)=>(
				<div 
					key={user.id}
					onClick={()=> navigate(`/admin/userdetails/${user.id}`)}
					className={` flex justify-start items-center p-3 border rounded-lg shadow space-x-3 bg-white  ${user.isAllowed ? 'hover:bg-green-200' : 'hover:bg-red-200'}`}>
						{/* ${user.isAllowed ? 'bg-green-200 hover:bg-green-400' : 'bg-red-200 hover:bg-red-400'} */}
						{/* ${user.isAllowed ? 'hover:bg-green-400' : 'hover:bg-red-400'} */}
						<div 
							className=" rounded-full bg-slate-300 py-4 text-center h-14 w-14 font-semibold my-2">
							{user.id}
						</div>
						<div>
							<h1 className="font-semibold text-lg">Full name : {user.fullName}</h1>
							<p className="font-semibold">Email : {user.email}</p>
							<p className="font-semibold text-sm">User Name : {user.username}</p>
							{!user.isAllowed ? <p className="font-semibold">Status : <span className="font-bold text-md text-red-600">Blocked</span></p> : <p className="font-semibold">Status : <span className="font-bold text-md text-green-600">Active</span></p>}
						</div>
				</div>
			))}

			</div>
			
		</div>
      </div>
    </div>
	</div>
	</div>
  );
};

export default AdminHome;
