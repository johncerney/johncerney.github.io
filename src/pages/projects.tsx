import * as React from 'react';
import _projectsList from '../projects.json';
import Modal from "../components/modal";
import RadioButtonList from "../components/radioButtonList";
// @ts-ignore
import LazyLoad from 'react-lazyload';
// @ts-ignore
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

interface Additional {
  text?: string;
  img?: string;
  video?: string;
}

export interface Project {
  main: string;
  title: string;
  date: number | string;
  description: string;
  tags: string[];
  location: string;
  additional?: Additional[];
}

const projectsList = _projectsList as Project[];

const filters = ["all", "recent", "early", "midwestern", "california"];

interface ProjectsState {
  filter: string;
  modalImg: string;
  showModal: boolean;
  projects: Project[];
}
 
class Projects extends React.Component<{}, ProjectsState> {
  state = {
    filter: filters[0],
    modalImg: "",
    showModal: false,
    projects: projectsList
  }

  toggleModal = (modalImg:string | boolean, showModal:boolean) => {
    if (typeof modalImg === "boolean") {
      showModal = modalImg;
      modalImg = "";
    }
    this.setState({ modalImg, showModal });
  }

  onFilterUpdate = (filter:string) => {
   let last = this.state.filter;
    if (last == filter) return;
    this.setState({ filter });
    if (filter == "all") {
      this.setState({ projects: projectsList });
      // let projects = Array.from(document.getElementsByClassName("project") as HTMLCollectionOf<HTMLElement>);
      // projects.forEach((element) => {
      //   element.style.display = "block"; 
      // });
    } else {
      let all = projectsList;
      let filteredList = projectsList.filter(project => project.tags.includes(filter));
      this.setState({ projects: filteredList })
      // let toHide;
      // if (last == "all")
      //   toHide = Array.from(document.getElementsByClassName("project") as HTMLCollectionOf<HTMLElement>);
      // else
      //   toHide = Array.from(document.getElementsByClassName(last) as HTMLCollectionOf<HTMLElement>);
      // toHide.forEach((element) => {
      //   element.style.display = "none"; 
      // })

      // let toShow = Array.from(document.getElementsByClassName(filter) as HTMLCollectionOf<HTMLElement>);
      // toShow.forEach((element) => {
      //   element.style.display = "block";
      // });
    }
  }

  render() {
    let projects = this.state.projects;
    return (  
      <div className="page">
        <h1>Projects</h1>
        <div className="radio-button-container"><RadioButtonList
          strings={filters}
          onUpdate={this.onFilterUpdate}
        /></div>

        <ResponsiveMasonry className="top-margin" columnsCountBreakPoints={{700: 1, 800: 2, 1000: 3}} >
          <Masonry gutter="2rem">
            {projects.map(obj => {
              return (<div className={obj.tags.join(" ") + " project"}>
                <LazyLoad height={500} offset={100}>
                <div className="project-img-container"><img src={"murals/"+obj.main} onClick={() => {this.toggleModal("murals/"+obj.main, true)}} /></div>
                </LazyLoad>
                <h3>{obj.title}</h3>
                <h4>{obj.date}</h4>
                <p>{obj.description}</p>
                {(obj.additional)? (obj.additional.map(item => {
                  if (item.img) return (<LazyLoad height={500} offset={100}>
                    <div className="project-img-container"><img src={"murals/"+item.img} onClick={() => {this.toggleModal("murals/"+item.img, true)}}/></div>
                  </LazyLoad>)
                  else if (item.text) return <p>{item.text}</p>
                  else if (item.video) return <iframe className="video" src={item.video} frameBorder="0" allowFullScreen />
                })) : null}
              </div>)
            })}
          </Masonry>
        </ResponsiveMasonry>

        {(this.state.showModal)? 
          <Modal 
            imgUrl={this.state.modalImg}
            toggleModalFunction={this.toggleModal}
          /> : null}
      </div>
    );
  }
}

export default Projects;
