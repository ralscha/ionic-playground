import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input('appHasRole')
  roles: string[];


  constructor(private readonly authService: AuthService,
              private readonly templateRef: TemplateRef<any>,
              private readonly viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.authService.getUser$().subscribe(() => {
      if (this.authService.hasRoles(this.roles)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

}
