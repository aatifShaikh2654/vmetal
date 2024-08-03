'use client'
import Scrollbar from 'smooth-scrollbar';
import { useEffect } from 'react';
import gsap from "gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)


const options = {
    damping: 0.07,
}

const SmoothScroll = () => {

    useEffect(() => {

        const scroller = document.querySelector('.smoothContainer');

        const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });

        ScrollTrigger.scrollerProxy(".smoothContainer", {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
            }
        });

        bodyScrollBar.addListener(ScrollTrigger.update);

        ScrollTrigger.defaults({ scroller: scroller });


        // This part is only necessary if you're using ScrollTrigger's markers:
        if (document.querySelector('.gsap-marker-scroller-start')) {
            const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
            bodyScrollBar.addListener(({ offset }) => gsap.set(markers, { marginTop: -offset.y }));
        }
        // End section necessary only if you're using ScrollTrigger's marker

    }, [])

    return null;
}

export default SmoothScroll;