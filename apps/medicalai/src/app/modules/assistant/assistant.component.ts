/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '@myorg/material';
import { MarkdownModule } from 'ngx-markdown';
import { SnackbarNotificationsModule } from '@myorg/snackbar-notifications';

import { HttpService } from '../../services/http.service';
import { ShareService } from '../../services/share.service';
import { Subscription } from 'rxjs';
import { Threads } from '../../core/interfaces/threads';

import 'prismjs';
//Components
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-csharp.min.js';
import 'prismjs/components/prism-css.min.js';

import 'prismjs/plugins/autoloader/prism-autoloader.js';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/download-button/prism-download-button.js';
import 'prismjs/plugins/show-language/prism-show-language.js';
import 'prismjs/plugins/inline-color/prism-inline-color.js';
import { MarkdownComponent } from 'ngx-markdown';
import { NotificationsService } from '@myorg/snackbar-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-assistant',
    standalone: true,
    imports: [
        CommonModule,
        BreadcrumbModule,
        SharedModule,
        MaterialModule,
        MarkdownModule,
        SnackbarNotificationsModule,
    ],
    templateUrl: './assistant.component.html',
    styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
    @ViewChild('markdownComponent') markdownComponent!: MarkdownComponent;

    subscriptions: Subscription = new Subscription();
    assistantForm!: FormGroup;
    userTreadsDatasource: Array<any> = [];
    content: Array<any> = [];
    files: File[] = [];
    activarToolbar!: boolean;
    prismjsFlag: boolean = false;
    imageContentAvailable = false;
    hasImages = false;
    contentFiles: string = '';

    user: any;
    geminiContent: any;

    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private shareService: ShareService,
        private notificationService: NotificationsService
    ) {
        this.subscriptions.add(
            this.shareService.currentUser$.subscribe(
                (user) => (this.user = user)
            )
        );
        this.activarToolbar = true;
        this.assistantForm = this.fb.group({
            instruccion: ['', Validators.required],
            user_id: [this.user.id, Validators.required],
            thread_id: [null, Validators.nullValidator],
        });
    }

    ngOnInit(): void {
        this.getUserThreads();
    }

    onSubmit() {
        this.subscriptions.add(
            this.httpService
                .consultAssistant(this.assistantForm.value)
                .subscribe({
                    next: (res) => {
                        this.assistantForm.patchValue({
                            thread_id: res.gemini.id,
                        });
                        this.geminiContent = res.gemini;
                    },
                    error: (error) => {
                        this.notificationService.openSnackBar(
                            'Ha ocurrido un error, intentalo nuevamente',
                            'end',
                            'top',
                            5000
                        );
                        console.error(error);
                    },
                    complete: () => {
                        this.resetMarkdown();
                        this.getGeminiContentResponse();
                        this.getUserThreads();
                        this.assistantForm.patchValue({
                            instruccion: null,
                        });
                    },
                })
        );
    }

    getUserThreads() {
        this.subscriptions.add(
            this.httpService.getUserThreads(this.user.id).subscribe({
                next: (res) => {
                    this.userTreadsDatasource = res.gemini;
                },
                error: (error) => {
                    console.error(error);
                },
            })
        );
    }

    restartConversation(e: Threads) {
        this.content = [];
        this.assistantForm.patchValue({
            thread_id: e.id,
        });
        this.geminiContent = e;
        this.getGeminiContentResponse();
    }

    deleteChat(e: Threads) {
        const THREAD = e;
        this.subscriptions.add(
            this.httpService.deleteThread(THREAD.id).subscribe({
                next: (res) => {
                    this.notificationService.openSnackBar(
                        res.msg,
                        'end',
                        'top',
                        5000
                    );
                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    this.assistantForm.patchValue({
                        instruccion: null,
                        thread_id: null,
                    });
                    this.resetMarkdown();
                    this.getUserThreads();
                },
            })
        );
    }

    clearBox(): void {
        const mode = this.assistantForm.value.mode;
        this.assistantForm.reset({
            instruccion: null,
            user_id: this.user.id,
            thread_id: null,
        });
        this.geminiContent = [];
        this.content = [];
        this.files = [];
        this.contentFiles = '';
    }

    getGeminiContentResponse(): void {
        this.geminiContent.gemini.contents.forEach((c: any) => {
            c.parts.forEach((p: any) => {
                if (p) {
                    this.content.push({ role: c.role, text: p.text });
                }
            });
        });
    }

    resetMarkdown(): void {
        if (this.content.length > 0) {
            this.content = [];
            this.markdownComponent.data = null;
        }
    }

    handleFile(e: any) {
        if (e.isTrusted && e.target.files.length > 0) {
            for (let index = 0; index < e.target.files.length; index++) {
                const file = e.target.files[index];
                const find = (fileUploaded: File) => fileUploaded.name === file.name;
                const isUploaded = this.files.find(find);
                if (!isUploaded) this.files.push(file);
                this.showFile(file);
            }
        }
    }

    showFile(file: any) {
        const mimeTypes = ['image/png'];
        // eslint-disable-next-line prefer-const
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
            const fileBody = mimeTypes.includes(file.type)
                ? `![${file.name}](${e.target.result})`
                : '';
            this.contentFiles += `
                # ${file.name}
                ${fileBody}
            `;
        };
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
