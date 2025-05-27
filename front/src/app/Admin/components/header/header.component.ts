import { Component , OnInit} from '@angular/core';
import { SharedService } from '../../../services/navigation/shared.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  selectedTitle: string = '';

  constructor(private SharedService: SharedService) { }

  ngOnInit(): void
  {
    this.SharedService.currentParenttitle$.subscribe(title => {
      this.selectedTitle = title;
    });
  }

}
