import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatCheckboxModule,
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatTabsModule,
            MatCardModule,
            MatSelectModule,
            MatProgressSpinnerModule,
            MatDialogModule,
            MatTableModule,
            MatSortModule,
            MatPaginatorModule,
            MatSnackBarModule],
  exports: [MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatCheckboxModule,
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatTabsModule,
            MatCardModule,
            MatSelectModule,
            MatProgressSpinnerModule,
            MatDialogModule,
            MatTableModule,
            MatSortModule,
            MatPaginatorModule,
            MatSnackBarModule]
})
export class MaterialModule {

}