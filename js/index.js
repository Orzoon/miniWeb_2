document.addEventListener("DOMContentLoaded", ()=>{
    const overlay = document.querySelectorAll(".overlay");
    const firstCube = document.querySelector(".firstCube");
    const secondCube =document.querySelector(".secondCube");
    const mainContainer = document.querySelector(".main_container ")
    
    // values
    // overlay ai,pr,ps,ae
    const overlayColors = ["#E9D1BD", "#F5C2F1", "#D7DDF5", "rgb(239, 215, 245)"]
    const cubeTopColor = ["#EE842C", "#E777F5", "#2BC3F5", "#CB8FF5"]
    const cubeSideColor = ["#A75511", "#AE46BE", "#1785A9", "#824CAB"]
    const textMainClass = [".ai_a", ".pr_p", ".ps_p", ".ae_a"]
    const textSecondaryClass = [".ai_i", ".pr_r", ".ps_s", ".ae_e"]

    // cubesides
    //first
    const fcTop = document.querySelector(".fc_top");
    const fcLeft = document.querySelector(".fc_left");
    const fcFront = document.querySelector(".fc_front");
    const fcBottom = document.querySelector(".fc_bottom");

    // individual timelines
    const t1 = commonTimeline(0)
    const t2 = commonTimeline(1)
    const t3= commonTimeline(2)
    const t4 = commonTimeline(3)
   
    // main Timeline --init
    init()
    function init(){
        const mainTimeline = gsap.timeline({repeat: -1})
        mainTimeline.add(t1).add(t2).add(t3).add(t4)
    }

    // functions 
    function commonTimeline(count){
        let timeline = new gsap.timeline({paused: false});
        timeline.timeScale(1.2)
       //console.log(t1.totalDuration())
            timeline.to(overlay[count],{height: "200vh", width: "200vw", duration: 0.4, ease: "ease-in"}, 0)
            .call(cubeFunctionFirst, [cubeTopColor[count], cubeSideColor[count]], "<0.1")
            .call(cubeFunctionSecond, null, "<")
            .to(".secondCube",
                {margin: "-20 0 0 0", 
                duration: 3, 
                ease:"elastic.out(1.75, 0.2)"}, "<0.7")
            .addLabel("secondCubeLabel", "<0.2")
            .to(textMainClass[count], {opacity: 1, duration: 0}, "secondCubeLabel")
            .to(textSecondaryClass[count], {opacity: 1, duration: 0}, "<0.2")
            .to(textMainClass[count], {
                margin: "-20 0 0 0",
                duration: 2,
                ease:"elastic.out(1.75, 0.2)"}, "secondCubeLabel")
            .to(textSecondaryClass[count], {
                    margin: "-20 0 0 0",
                    duration: 2,
                    ease:"elastic.out(1.75, 0.2)"}, "<0.1")
            .to(mainContainer, {
                margin: "-10 0 0 0", 
                duration: 2,
                ease:"elastic.out(1.75, 0.2)"
            }, "secondCubeLabel-=1")
            // retracting
            .to(".secondCube",
            {margin: "0 0 0 0", 
            duration: 3, 
            ease:"elastic.in(1.75, 0.2)"}, ">secondCubeLabel") 
            .addLabel("secondCubeEnd", "<0.2")
            .to(textSecondaryClass[count], {
                margin: "0 0 0 0",
                duration: 3,
                ease:"elastic.in(1.75, 0.2)"}, "secondCubeEnd")
            .addLabel("opacityOut")
            .to(textMainClass[count], {
                margin: "0 0 0 0",
                duration: 3,
                ease:"elastic.in(1.75, 0.2)"}, "secondCubeEnd+=0.1")
            .to(textSecondaryClass[count], {opacity: 0, duration: 0}, "opacityOut")
            .to(textMainClass[count], {opacity: 0, duration: 0}, "opacityOut+=0.1")
            // external function
           .call(cubeFunctionSecondClose,null, "<0.2")
           .call(cubeFunctionFirstClose, null, "<0.1")
           .call(cleanup, null, "<1.6")
           return timeline
        }

    function cubeFunctionFirst(topColor, sideColor){
        //changing color of the cube
        fcTop.style.backgroundColor = topColor;
        fcLeft.style.backgroundColor = sideColor;
        fcFront.style.backgroundColor = sideColor;
        fcBottom.style.backgroundColor = sideColor;
        //anim
        firstCube.classList.add("firstCubeForwardAnim")
    }
    function cubeFunctionSecond(){
        secondCube.classList.add("secondCubeForwardAnim")
    }

    function cubeFunctionSecondClose(){
        secondCube.classList.add("secondCubeBackwardAnim")
    }

    function cubeFunctionFirstClose(){
        firstCube.classList.add("firstCubeBackwardAnim")
    }

    function cleanup(){
        firstCube.classList.remove("firstCubeForwardAnim")
        firstCube.classList.remove("firstCubeBackwardAnim")
        secondCube.classList.remove("secondCubeForwardAnim")
        secondCube.classList.remove("secondCubeBackwardAnim")
    }
})