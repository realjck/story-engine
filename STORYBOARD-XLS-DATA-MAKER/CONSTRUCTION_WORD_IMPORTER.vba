Sub Word_Importer()

    Dim objWord As New Word.Application
    
    FName = Application.GetOpenFilename
    If FName <> False Then
    
        Dim objDoc As New Word.Document
        Set objDoc = objWord.documents.Open(FName)
        
        Dim rng As Word.Range
        Set rng = objDoc.Content
        
        Dim code As String
        Dim code_name As String
        Dim code_ecran_counter As Integer
        Dim code_son_counter As Integer
        
        Dim current_quiz As String
        Dim quiz_counter As Integer
        Dim quiz_line_counter As Integer
        Dim quiz_current_consigne As String
        
        Dim current_ancrage As String
        Dim ancrage_counter As Integer
        Dim ancrage_line_counter As Integer
        
        Dim current_perso As String
        Dim line_counter As Integer
        Dim txt As String
        Dim style As String
        
        code_name = InputBox("Entrez le préfixe pour nommer les sons", "Préfixe des sons")
        
        ThisWorkbook.Sheets.Add After:=Sheets(Sheets.Count)
        ActiveSheet.Name = "STORY"
        
        ActiveWorkbook.ActiveSheet.Cells(1, 1).Value = "son"
        ActiveWorkbook.ActiveSheet.Cells(1, 2).Value = "perso"
        ActiveWorkbook.ActiveSheet.Cells(1, 3).Value = "deroule"
        ActiveWorkbook.ActiveSheet.Cells(1, 4).Value = "script"
        ActiveWorkbook.ActiveSheet.Cells(1, 1).style = "Accent1"
        ActiveWorkbook.ActiveSheet.Cells(1, 2).style = "Accent1"
        ActiveWorkbook.ActiveSheet.Cells(1, 3).style = "Accent1"
        ActiveWorkbook.ActiveSheet.Cells(1, 4).style = "Accent1"
        
        current_quiz = ""
        quiz_counter = 0
        quiz_current_consigne = ""
        
        current_ancrage = ""
        ancrage_counter = 0
        
        line_counter = 2
        code_ecran_counter = 0
        code_son_counter = 0
        
        Dim i As Integer
        For i = 1 To rng.Paragraphs.Count()
        
            txt = rng.Paragraphs.Item(i).Range.Text
            txt = Trim(Replace(Replace(txt, Chr(10), ""), Chr(13), ""))
            
            style = Trim(rng.Paragraphs.Item(i).Range.style)
            
            If txt <> "" Then
            
                ' GESTION QUIZ
                If style = "ACTIVITE_QUIZ_QUESTION" Or style = "ACTIVITE_QUIZ_QUESTION (lu)" Or style = "ACTIVITE_QUIZ_CONSIGNE" Then
                
                    If (current_ancrage <> "") Then
                        current_ancrage = ""
                    End If
                
                    If current_quiz = "" Then
                        quiz_counter = quiz_counter + 1
                        current_quiz = "QUIZ_e" & CStr(code_ecran_counter) & "_" & CStr(quiz_counter)
                        
                        Sheets("STORY").Select
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = current_quiz
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).style = "Accent6"
                        line_counter = line_counter + 1
                        
                        ThisWorkbook.Sheets.Add After:=Sheets(Sheets.Count)
                        ActiveSheet.Name = current_quiz
                        ActiveWorkbook.ActiveSheet.Cells(1, 1).Value = "id"
                        ActiveWorkbook.ActiveSheet.Cells(1, 2).Value = "value"
                        ActiveWorkbook.ActiveSheet.Cells(1, 3).Value = "image"
                        ActiveWorkbook.ActiveSheet.Cells(1, 4).Value = "son"
                        ActiveWorkbook.ActiveSheet.Cells(1, 1).style = "Accent1"
                        ActiveWorkbook.ActiveSheet.Cells(1, 2).style = "Accent1"
                        ActiveWorkbook.ActiveSheet.Cells(1, 3).style = "Accent1"
                        ActiveWorkbook.ActiveSheet.Cells(1, 4).style = "Accent1"
                        
                        quiz_line_counter = 1
                        
                    Else
                    
                        If ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value <> "feedback" And ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value <> "consigne" Then
                            quiz_line_counter = quiz_line_counter + 1
                            ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "feedback"
                        End If
                        
                    End If
                    
                    ' add quiz line
                    If style = "ACTIVITE_QUIZ_CONSIGNE" Then
                        quiz_current_consigne = txt
                    End If
                    
                    If quiz_current_consigne <> "" And ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value <> "consigne" Then
                        quiz_line_counter = quiz_line_counter + 1
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "consigne"
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = quiz_current_consigne
                    End If
                    
                    If style = "ACTIVITE_QUIZ_QUESTION" Then
                        quiz_line_counter = quiz_line_counter + 1
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "question"
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = txt
                        
                    ElseIf style = "ACTIVITE_QUIZ_QUESTION (lu)" Then
                    
                        Sheets("STORY").Select
                        
                        ' CODE SON :
                        code_son_counter = code_son_counter + 1
                        
                        code = code_name & "_e"
                        
                        If code_ecran_counter < 10 Then
                            code = code & "0"
                        End If
                        
                        code = code & CStr(code_ecran_counter) & "s"
                        
                        If code_son_counter < 10 Then
                            code = code & "0"
                        End If
                            
                        code = code & CStr(code_son_counter)
                        
                        ' ADD LINE IN STORY
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 1).Value = code
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = txt
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).style = "Accent3"
                    
                        line_counter = line_counter + 1
                        
                        ' SWITCH BACK TO QUIZ SHEET
                        Sheets(current_quiz).Select
                        
                        quiz_line_counter = quiz_line_counter + 1
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "question"
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = txt
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 4).Value = code
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 4).style = "Accent3"
                        
                        
                    End If
                    
                ElseIf style = "ACTIVITE_QUIZ_PROP_NONOK" Then
                    quiz_line_counter = quiz_line_counter + 1
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = txt
                
                ElseIf style = "ACTIVITE_QUIZ_PROP_OK" Then
                    quiz_line_counter = quiz_line_counter + 1
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "ok"
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = txt
                    
                ElseIf style = "ACTIVITE_QUIZ_FEEDBACK" Then
                    If ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "feedback" Then
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value & Chr(13) & Chr(13) & txt
                    Else
                        quiz_line_counter = quiz_line_counter + 1
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "feedback"
                        ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = txt
                    End If
                    
                ElseIf style = "ACTIVITE_QUIZ_FEEDBACK (lu)" Then
                
                    Sheets("STORY").Select
                        
                    ' CODE SON :
                    code_son_counter = code_son_counter + 1
                    
                    code = code_name & "_e"
                    
                    If code_ecran_counter < 10 Then
                        code = code & "0"
                    End If
                    
                    code = code & CStr(code_ecran_counter) & "s"
                    
                    If code_son_counter < 10 Then
                        code = code & "0"
                    End If
                        
                    code = code & CStr(code_son_counter)
                    
                    ' ADD LINE IN STORY
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 1).Value = code
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = txt
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).style = "Accent3"
                
                    line_counter = line_counter + 1
                    
                    ' SWITCH BACK TO QUIZ SHEET
                    Sheets(current_quiz).Select
                    
                    quiz_line_counter = quiz_line_counter + 1
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "feedback"
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 2).Value = txt
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 4).Value = code
                    ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 4).style = "Accent3"
                    
                
                ' GESTION ECRANS ANCRAGE
                ElseIf style = "ACTIVITE_ANCRAGE_BULLET" Or style = "ACTIVITE_ANCRAGE_BULLET (lu)" Or style = "ACTIVITE_ANCRAGE_PARAGRAPHE" Or style = "ACTIVITE_ANCRAGE_PARAGRAPHE (lu)" Or style = "ACTIVITE_ANCRAGE_GRAS" Or style = "ACTIVITE_ANCRAGE_GRAS (lu)" Or style = "ACTIVITE_ANCRAGE_PARAGRAPHE_NORMAL" Or style = "ACTIVITE_ANCRAGE_PARAGRAPHE_NORMAL (lu)" Then
                
                    CheckEndQuiz current_quiz, quiz_line_counter
                    current_quiz = ""
                    quiz_current_consigne = ""
                
                    If current_ancrage = "" Then
                        ancrage_counter = ancrage_counter + 1
                        current_ancrage = "CONTENU_e" & CStr(code_ecran_counter) & "_" & CStr(ancrage_counter)
                        
                        Sheets("STORY").Select
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = current_ancrage
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).style = "Accent6"
                        line_counter = line_counter + 1
                        
                        ThisWorkbook.Sheets.Add After:=Sheets(Sheets.Count)
                        ActiveSheet.Name = current_ancrage
                        ActiveWorkbook.ActiveSheet.Cells(1, 1).Value = "texte"
                        ActiveWorkbook.ActiveSheet.Cells(1, 2).Value = "medias"
                        ActiveWorkbook.ActiveSheet.Cells(1, 1).style = "Accent1"
                        ActiveWorkbook.ActiveSheet.Cells(1, 2).style = "Accent1"

                        ancrage_line_counter = 1
                        
                    End If
                    
                    If style = "ACTIVITE_ANCRAGE_BULLET" Then
                        txt = "-" & txt
                        
                    ElseIf style = "ACTIVITE_ANCRAGE_GRAS" Then
                        txt = "GRAS:" & txt
                        
                    ElseIf style = "ACTIVITE_ANCRAGE_PARAGRAPHE_NORMAL" Then
                        txt = "SMALL:" & txt
                        
                    ElseIf style = "ACTIVITE_ANCRAGE_PARAGRAPHE (lu)" Or style = "ACTIVITE_ANCRAGE_BULLET (lu)" Or style = "ACTIVITE_ANCRAGE_GRAS (lu)" Or style = "ACTIVITE_ANCRAGE_PARAGRAPHE_NORMAL (lu)" Then
                    
                        Sheets("STORY").Select
                        
                        ' CODE SON :
                        code_son_counter = code_son_counter + 1
                        
                        code = code_name & "_e"
                        
                        If code_ecran_counter < 10 Then
                            code = code & "0"
                        End If
                        
                        code = code & CStr(code_ecran_counter) & "s"
                        
                        If code_son_counter < 10 Then
                            code = code & "0"
                        End If
                            
                        code = code & CStr(code_son_counter)
                        
                        ' ADD LINE IN STORY
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 1).Value = code
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = txt
                        ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).style = "Accent3"
                    
                        line_counter = line_counter + 1
                        
                        ' SWITCH BACK TO ANCRAGE SHEET
                        Sheets(current_ancrage).Select

                        ActiveWorkbook.ActiveSheet.Cells(ancrage_line_counter + 1, 2).Value = "SON:" & code
                        ActiveWorkbook.ActiveSheet.Cells(ancrage_line_counter + 1, 2).style = "Accent3"
                        
                        If style = "ACTIVITE_ANCRAGE_BULLET (lu)" Then
                            txt = "-" & txt
                        ElseIf style = "ACTIVITE_ANCRAGE_GRAS (lu)" Then
                            txt = "GRAS:" & txt
                        ElseIf style = "ACTIVITE_ANCRAGE_PARAGRAPHE_NORMAL (lu)" Then
                            txt = "SMALL:" & txt
                        End If
                        
                    End If
                    
                    ' ADD LINE
                    ancrage_line_counter = ancrage_line_counter + 1
                    ActiveWorkbook.ActiveSheet.Cells(ancrage_line_counter, 1).Value = txt
                
                ElseIf style = "ACTIVITE_ANCRAGE_SAUT_DE_PAGE" Then

                    current_ancrage = ""
                
                ' VOIX
                ElseIf style = "DIALOGUE_PERSO" Then
                
                    CheckEndQuiz current_quiz, quiz_line_counter
                    current_quiz = ""
                    quiz_current_consigne = ""
                    
                    If (current_ancrage <> "") Then
                        Sheets("STORY").Select
                        current_ancrage = ""
                    End If
                    
                    current_perso = Trim(Replace(txt, ":", ""))
                    
                ElseIf style = "DIALOGUE_VOIX" Then
                
                    CheckEndQuiz current_quiz, quiz_line_counter
                    current_quiz = ""
                    quiz_current_consigne = ""
                    
                    If (current_ancrage <> "") Then
                        Sheets("STORY").Select
                        current_ancrage = ""
                    End If
                
                    ' CODE SON :
                    code_son_counter = code_son_counter + 1
                    
                    code = code_name & "_e"
                    
                    If code_ecran_counter < 10 Then
                        code = code & "0"
                    End If
                    
                    code = code & CStr(code_ecran_counter) & "s"
                    
                    If code_son_counter < 10 Then
                        code = code & "0"
                    End If
                        
                    code = code & CStr(code_son_counter)
                    
                    ' ADD LINE
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 1).Value = code
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 2).Value = current_perso
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = txt
                
                    line_counter = line_counter + 1
                    
                 ElseIf style = "TITRE_CHAPITRE" Then
                 
                    CheckEndQuiz current_quiz, quiz_line_counter
                    current_quiz = ""
                    quiz_counter = 0
                    quiz_current_consigne = ""
                    
                    If (current_ancrage <> "") Then
                        Sheets("STORY").Select
                        current_ancrage = ""
                    End If
                    ancrage_counter = 0
                
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).Value = txt
                    ActiveWorkbook.ActiveSheet.Cells(line_counter, 3).style = "Accent5"
                
                    line_counter = line_counter + 1
                    
                    code_ecran_counter = code_ecran_counter + 1
                    code_son_counter = 0
                    
                
                End If
            
            End If
            
        Next
        
        CheckEndQuiz current_quiz, quiz_line_counter
    
        objDoc.Close
        objWord.Quit
        
        MsgBox ("Document importé avec succès.")
        ThisWorkbook.SaveAs code_name & "_construction.xls", FileFormat:=56
        
    End If

End Sub

Private Sub CheckEndQuiz(current_quiz, quiz_line_counter)
    If (current_quiz <> "") Then
        If ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value <> "feedback" Then
            quiz_line_counter = quiz_line_counter + 1
            ActiveWorkbook.ActiveSheet.Cells(quiz_line_counter, 1).Value = "feedback"
        End If
        
        Sheets("STORY").Select
        
    End If
End Sub