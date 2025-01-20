import React from "react";
import SideNavbar from "../../Component/SideNavbar/SideNavbar";
import HomePage from "../../Component/HomePage/HomePage";

const Home = ({sideNavbar, searchResults, searchQuery}) => {
    return(
        <>
            <SideNavbar sideNavbar={sideNavbar}/>
            <HomePage sideNavbar={sideNavbar} searchResults={searchResults} searchQuery={searchQuery} />
        </>
    )
}

export default Home;