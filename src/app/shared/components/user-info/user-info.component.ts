import { Component, Input } from '@angular/core';
import { UserLoggedData } from '../../interfaces/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent {
  @Input() user: UserLoggedData | null = null;
  @Input() displayEmail?: boolean;
}
