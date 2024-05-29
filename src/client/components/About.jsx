import React from 'react';
import Navbar from './Navbar';
import './About.css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor vel velit a ullamcorper. Aenean venenatis risus in lectus convallis, nec auctor urna interdum. Duis id ex ac libero placerat gravida. 
        </p>
        <p>
          Nulla facilisi. Phasellus convallis lacinia sapien, id vehicula metus varius in. Mauris accumsan tincidunt dui, ut feugiat arcu ultrices id. Morbi tristique lacinia massa, id sagittis velit vehicula ut. Integer vitae nisl vitae neque tempus malesuada. 
        </p>
        <p>
          Sed vitae quam ut nisi sodales tincidunt. Cras at ligula metus. Fusce non lacinia elit, id ultrices orci. Praesent vel nulla ac sem suscipit eleifend. Curabitur a lacinia arcu. 
        </p>
      </div>
    </>
  );
}

export default About;
