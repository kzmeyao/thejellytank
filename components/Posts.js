import React from 'react';

var Post = (props) => {
  return <li>
    <div className="desc">
      <h1>{props.title}</h1>
      <div><small>{props.subtitle}</small></div>
    </div>
    <a href={props.url} target="_blank"><img src={props.img} /></a>
  </li>;
};

class Posts extends React.Component {
  constructor(props) {
    super();
    this.state = {
      posts: [
        {
          title: "KUSAKABE, San Francisco",
          subtitle: "December 10, 2015",
          img: "https://cdn-images-1.medium.com/max/800/1*Tk9VfeoOp4kZAwOk9FTpkQ.jpeg",
          url: "https://medium.com/@kzmeyao/kusakabe-san-francisco-f06ca18630a7#.e9sqvnmhk"
        },
        {
          title: "Grizzly Lake, Trinity Alps",
          subtitle: "July 26 - July 28, 2015",
          img: "https://cdn-images-1.medium.com/max/800/1*qyChxO31fdd7ho24BiIJrQ.jpeg",
          url: "https://medium.com/@kzmeyao/grizzly-lake-trinity-alps-9a0e6fb13c32#.h06njh7i4"
        },
        {
          title: "Amer Fort",
          subtitle: "आमेर क़िला",
          img: "https://cdn-images-1.medium.com/max/800/1*SGUwe9_7yIPNpXNIK_sYrA.jpeg",
          url: "https://medium.com/@kzmeyao/amer-fort-6feea9e76462#.9wvhyow8n"
        },
        {
          title: "Costa Rica, Pt. II",
          subtitle: "December 17 - December 22, 2014",
          img: "https://cdn-images-1.medium.com/max/800/1*qlqRV-7FysTjcre-wapcSw.jpeg",
          url: "https://medium.com/@kzmeyao/costa-rica-pt-ii-8dbd6542e9fc#.jw8mmoqcy"
        },
        {
          title: "Costa Rica, Pt. I",
          subtitle: "December 12 - December 17, 2014",
          img: "https://cdn-images-1.medium.com/max/800/1*DyHoQrxW205LoSB5W2wXZw.jpeg",
          url: "https://medium.com/@kzmeyao/costa-rica-pt-i-8a58d4f3f795#.blrhdg5zi"
        }
      ]
    };
  }
  render() {
    return <ul className="posts">
      {this.state.posts.map(post => (
        <Post key={post.title} title={post.title} subtitle={post.subtitle} img={post.img} url={post.url} />
      ))}
    </ul>;
  }
}

export default Posts;