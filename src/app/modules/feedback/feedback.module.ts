import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { QuestionariesComponent } from './questionaries/questionaries.component';
import { ReportComponent } from './report/report.component';
import { ErrorModalModule } from 'src/app/error-modal/error-modal.module';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { UserModule } from '../user/user.module';
import { LogoutComponent } from '../logout/logout.component';
import { AppModule } from 'src/app/app.module';
import { LogoutModule } from '../logout/logout.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
    declarations: [
        FeedbackComponent,
        QuestionariesComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        ErrorModalModule,
        LogoutModule,
        SocialLoginModule
    ]
})
export class FeedbackModule { }
