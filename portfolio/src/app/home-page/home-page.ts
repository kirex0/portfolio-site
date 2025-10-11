import { Component } from '@angular/core';
import { SkillList } from "../skill-list/skill-list";

@Component({
  selector: 'app-home-page',
  imports: [SkillList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

  name = 'Kade Shockey';
  title = 'Software Engineer';
  aboutText = `I'm a backend software engineer who loves turning complex problems 
    into technical solutions. From designing efficient APIs to implementing full-featured 
    systems, I focus on building solutions that are both performant and maintainable. 
    I approach every problem with thorough planning and agile methodologies to deliver 
    scalable yet elegant solutions.`;
}
