// scrollToTop
"use client";
import { useEffect, useState } from "react";
import React from "react";
import { HiArrowNarrowUp } from "react-icons/hi";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {
                isVisible &&
                <div className="scroll-to-top" onClick={scrollToTop}>
                    <HiArrowNarrowUp className="icon" />
                </div>
            }
        </>
    );
}