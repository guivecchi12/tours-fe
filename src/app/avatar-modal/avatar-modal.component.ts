import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../model/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avatar-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './avatar-modal.component.html',
  styleUrl: './avatar-modal.component.css',
})
export class AvatarModalComponent {
  @Input() user: User;
  @Output() logoutEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();

  onLogout(event: Event) {
    this.logoutEvent.emit();
    event.stopPropagation();
  }
  onClose(event: Event) {
    this.closeEvent.emit();
    event.stopPropagation();
  }
}
