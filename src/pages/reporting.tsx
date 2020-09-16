import React from "react";
import {UnattendingRegulars} from "../components/reporting/unattending-regulars";
import {PageNavigation} from "../components/navigation/page-navigation";
import {NavBar} from "../components/navigation/nav-bar";

export const Reporting = () => {
    return(
        <>
            <NavBar title={"Reporting"}/>
            <UnattendingRegulars/>
            <PageNavigation/>
        </>
    );
}
