export type TeamMember = {
    name: string;
    role: string;
    image: string;
    socialLinks: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };


export type TestimonialType = {
    content : string,
    author : string,
    role : string,
    avatar: string,
}

export type StatsType = {
    value : string, 
    label : string,
    icon : React.JSX.Element,
}