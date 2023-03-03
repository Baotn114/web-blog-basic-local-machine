import { useEffect, useState } from "react";
import BlogList from "./BlogList";
const Home = () => {
    const [blogList, setBlogList] = useState(null);

    useEffect(()=>{
        const fetchBlog = async () => {
            const response = await fetch("/api/routes");
            const json = await response.json();

            if(response.ok){
                setBlogList(json)
            }
        }
        fetchBlog()
    }, [])
    return ( 
        <div className="blog-list">
            {blogList && blogList.map((data_blog)=>(
                <BlogList key={data_blog._id} data_blog={data_blog}/>
            ))}
        </div>
    );
}
 
export default Home;
