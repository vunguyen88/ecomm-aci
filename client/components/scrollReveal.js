import { useRef, useEffect } from "react";
import scrollReveal from 'scrollreveal'

// const isBrowser = typeof window !== "undefined";

const ScrollReveal = ({ children, style, height }) => {
    //console.log('HEIGHT ', height)
    if (typeof window !== 'undefined') {
        const sectionRef = useRef(null);
        useEffect(() => {
            if (sectionRef.current)
            scrollReveal().reveal(sectionRef.current, {
                reset: true,
                delay: 600
              });
          }, []);
    
        return (
            <section
              ref={sectionRef}
              style={height ? {minHeight: height} : {minHeight: '95vh'}}
              //className="container"
              data-testid="section"
            >
              {children}
            </section>
        );
    } else {
        return null;
    }
    
}

export default ScrollReveal;