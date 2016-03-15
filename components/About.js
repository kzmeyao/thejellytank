import React from 'react';

class About extends React.Component {
  render() {
    return <div className="about-page">
      <div className="beach"></div>
      <div className="ocean">
        <h1>hello</h1>
        <p>I'm Kevin Z. Yao, and The Jelly Tank is my creative space. My job description states that I'm something along the lines of an engineer, but that does not paint the full picture. I like to think that I'm also an all-around creative person. Whether it's through photography, design, coding experiments, or writing, I'm constantly looking for new ways to stretch my artistic side. I have been inspired by many things in life, this is my way of giving back. Hopefully, there is something here that will inspire you. If not, try the links below.</p>
        <h1>what's with the jellies?</h1>
        <p>"What we see before us is just one tiny part of the world. We get in the habit of thinking, This is the world, but that's not true at all. The real world is a much darker and deeper place than this, and much of it is occupied by jellyfish and things."
          <br /><br />
          - Haruki Murakami, <em>The Windup Bird Chronicles</em>
        </p>
        <div className="hr"></div>
        <ul>
          <li><a href="https://medium.com/@kzmeyao" target="_blank">
            medium
          </a></li>
          <li><a href="http://500px.com/kzmeyao" target="_blank">
            500px
          </a></li>
          <li><a href="https://twitter.com/kzmeyao" target="_blank">
            twitter
          </a></li>
          <li><a href="mailto:kzmeyao@gmail.com" target="_blank" >
            email
          </a></li>
          <li><a href="https://github.com/kzmeyao" target="_blank">
            github
          </a></li>
          <li><a href="https://www.linkedin.com/in/kzmeyao/" target="_blank">
            linkedin
          </a></li>
        </ul>
        <br />
      </div>
    </div>;
  }
}

export default About;