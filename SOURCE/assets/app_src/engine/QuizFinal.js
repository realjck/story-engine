/*
Story-engine with Animate and Create.js
Copyright © 2024 devjck
Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

QuizFinal
author: JCK

 */

define(['engine/Player',
        'animator/ResponsiveStage',
        'animator/Tween',
        'util/Sequencer',
        'animator/MaskObjects',
        'util/UniqueTimer',
        'animator/Button',
        'animator/Voice',
        'animator/StorePosition',
        'animator/Mascotte',
        'animator/SwitchVisible',
        'animator/QuizQcmQcu',
        'util/JsonHandler',
        'animator/TweenValue',
        'pdf/Attestation',
        'pdf/ReponsesPartielles',
        'pdf/ReponsesCompletes',
        'util/ModalDialog',
        'animator/SoundJS',
        'engine/ChapitrePlayer',
        'animator/QuizBuilder'
    ], function (
        Player,
        ResponsiveStage,
        Tween,
        Sequencer,
        MaskObjects,
        UniqueTimer,
        Button,
        Voice,
        StorePosition,
        Mascotte,
        SwitchVisible,
        QuizQcmQcu,
        JsonHandler,
        TweenValue,
        Attestation,
        ReponsesPartielles,
        ReponsesCompletes,
        ModalDialog,
        SoundJS,
        ChapitrePlayer,
        QuizBuilder) {

    var _screen = "QUIZFINAL";
    var _score;

    return {
        init: function () {

            shortcut.remove("ctrl+alt+shift+right");

            // init screen
            s.gotoAndStop(_screen);
            s.visible = true;
            MaskObjects.init(s[_screen], ["part3", "part4"]);
            ResponsiveStage.storeClip(_screen, {
                horizontal: "fixed",
                vertical: "fixed"
            });

            var has_perso = true;

            part1();
            // part1
            function part1() {

                s[_screen]["part1"].visible = true;
                if (s[_screen]["part1"]["marcillac"] != undefined) {
                    s[_screen]["part1"]["marcillac"].gotoAndStop(0);
                } else {
                    has_perso = false;
                }

                // animate texts localization:
                s[_screen]["part1"]["consigne"].text = __gtexts[__lang].quizfin_start.replace("XXX", JsonHandler.get("CONFIG", "succes"));

                s[_screen]["part3"].champ_yourscore.text = __gtexts[__lang].animate_quizfinal_yourscore;
                s[_screen]["part3"]["feedbackright"].champ.text = __gtexts[__lang].animate_quizfinal_succes;
                s[_screen]["part3"]["reponses"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_answers;
                s[_screen]["part3"]["livret"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_memo;
                s[_screen]["part3"]["attestation"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_attestation;
                s[_screen]["part3"]["valider"].consigne.text = __gtexts[__lang].animate_quizfinal_submit;

                s[_screen]["part4"].champ_yourscore.text = __gtexts[__lang].animate_quizfinal_yourscore;
                s[_screen]["part4"]["feedbackwrong"].champ.text = __gtexts[__lang].animate_quizfinal_fail;
                s[_screen]["part4"]["telecharger"].consigne.text = __gtexts[__lang].animate_quizfinal_dl_answers;
                s[_screen]["part4"]["retenter"].consigne.text = __gtexts[__lang].animate_quizfinal_retry;

                Tween.init(s[_screen]["part1"]["bt_continue"], {
                    pop: true
                });

                JsonHandler.loadExcel("QUIZ_FINAL", next);

                function next() {

                    var perso = false;
                    var c = 0;
                    while (JsonHandler.getLine("QUIZ_FINAL", c)) {
                        if (JsonHandler.getLine("QUIZ_FINAL", c).son != "") {
                            perso = "marcillac";
                        }
                        c++;
                    }

                    Button.enableZoom(s[_screen]["part1"]["bt_continue"], function () {
                        if (has_perso) {
                            QuizBuilder.init(s, "QUIZ_FINAL", {
                                prologue: true,
                                perso: perso,
                                consigneauto: true,
                                no_feedback: JsonHandler.get("CONFIG", "quiz_final_no_feedback") == "yes"
                            }, end);
                        } else {
                            QuizBuilder.init(s, "QUIZ_FINAL", {
                                prologue: true,
                                consigneauto: true,
                                no_feedback: JsonHandler.get("CONFIG", "quiz_final_no_feedback") == "yes"
                            }, end);
                        }
                    });

                }
            }

            // end
            function end(score) {

                s.gotoAndStop(_screen);

                _score = score;
                Player.recordScore(0, _score);

                if (_score >= parseInt(JsonHandler.get("CONFIG", "succes"))) {
                    endRight();
                } else {
                    endWrong();
                }

                function endWrong() {
                    SwitchVisible.set(s[_screen], "part1", "part4");
                    MaskObjects.init(s[_screen]["part4"], ["feedbackwrong", "telecharger", "retenter"]);
                    TweenValue.init(s[_screen]["part4"]["score"], 0, _score, 20, {
                        callback: next,
                        append_string: "%"
                    });
                    function next() {
                        Tween.init(s[_screen]["part4"]["feedbackwrong"], {
                            callback: function () {
                                // Tween.init(s[_screen]["part4"]["telecharger"]);
                                Tween.init(s[_screen]["part4"]["retenter"]);
                                // Button.enableZoom(s[_screen]["part4"]["telecharger"]["bt"], ReponsesPartielles.print, null, null, {noDisable:true});
                                Button.enableZoom(s[_screen]["part4"]["retenter"]["bt"], function () {
                                    s[_screen]["part4"].visible = false;
                                    part1();
                                });
                            }
                        });

                        Player.scormRecordScore();

                    }
                }

                function endRight() {
                    SwitchVisible.set(s[_screen], "part1", "part3");
                    MaskObjects.init(s[_screen]["part3"], ["feedbackright", "reponses", "attestation", "livret", "valider"]);
                    TweenValue.init(s[_screen]["part3"]["score"], 0, _score, 20, {
                        callback: next,
                        append_string: "%"
                    });
                    function next() {
                        if (has_perso) {
                            Mascotte.play(s[_screen]["part3"]["marcillac"], JsonHandler.getLine("STORY", ChapitrePlayer.getIndex() + 1).son, {
                                text: JsonHandler.getLine("STORY", ChapitrePlayer.getIndex() + 1).deroule,
                                start: "pose",
                                end: "unpose"
                            }, function () {
                                SoundJS.init("assets/sounds/fx/applause.mp3");
                            });
                        } else {
                            SoundJS.init("assets/sounds/fx/applause.mp3");
                        }

                        var height_pointer = 550;

                        Sequencer.launch([
                          function (next) {
                              Tween.init(s[_screen]["part3"]["feedbackright"], {
                                  callback: next
                              });
                          },
                          // function(next) {
                          // Tween.init(s[_screen]["part3"]["reponses"], {callback:next});
                          // Button.enableZoom(s[_screen]["part3"]["reponses"]["bt"], ReponsesCompletes.print, null, null, {noDisable:true});
                          // },
                          function (next) {
                              if (JsonHandler.get("CONFIG", "attestation") == "yes") {

                                  s[_screen]["part3"]["attestation"].y = height_pointer;
                                  Tween.init(s[_screen]["part3"]["attestation"], {
                                      callback: next,
                                      noInit: true
                                  });
                                  Button.enableZoom(s[_screen]["part3"]["attestation"]["bt"],
                                      function () {
                                      if (Player.isScorm()) {
                                          Attestation.print();
                                      } else {
                                          ModalDialog.form(__gtexts[__lang].quizfin_cert1, __gtexts[__lang].quizfin_cert2, [{
                                                      value: "prenom",
                                                      name: __gtexts[__lang].quizfin_cert4,
                                                      glyphicon: "user"
                                                  }, {
                                                      value: "nom",
                                                      name: __gtexts[__lang].quizfin_cert3,
                                                      glyphicon: "user"
                                                  }
                                              ], callback);
                                          function callback(result) {
                                              result.prenom = result.prenom.toLowerCase().replace(/\b\w/g, function (l) {
                                                  return l.toUpperCase()
                                              });
                                              result.nom = result.nom.toLowerCase().replace(/\b\w/g, function (l) {
                                                  return l.toUpperCase()
                                              });
                                              Button.disable(s[_screen]["part3"]["attestation"]["bt"]);
                                              Attestation.print(result);
                                          }
                                      }
                                  }, null, null, {
                                      noDisable: true
                                  });

                                  height_pointer += 170;

                              } else {
                                  next();
                              }
                          },
                          function (next) {

                              if (JsonHandler.get("CONFIG", "synthese") != undefined) {

                                  s[_screen]["part3"]["livret"].y = height_pointer;

                                  Tween.init(s[_screen]["part3"]["livret"], {
                                      callback: next,
                                      noInit: true
                                  });

                                  Button.enableZoom(s[_screen]["part3"]["livret"]["bt"], function () {
                                      var fileurl = "assets/pdf/" + JsonHandler.get("CONFIG", "synthese");
                                      download(fileurl);
                                  }, null, null, {
                                      noDisable: true
                                  });

                                  height_pointer += 170;

                              } else {
                                  next();
                              }

                          },
                          function (next) {
                              Player.unlockCurrent();
                              if (Player.isScorm()) {

                                  if (JsonHandler.get("CONFIG", "bouton_validation_module").trim().toLowerCase() == "yes") {

                                      s[_screen]["part3"]["valider"].y = height_pointer;
                                      Tween.init(s[_screen]["part3"]["valider"], {
                                          noInit: true
                                      });
                                      Button.enableZoom(s[_screen]["part3"]["valider"]["bt"], finishAndClose);

                                  } else {
                                      Player.scormFinish();
                                  }

                                  function finishAndClose() {
                                      Player.scormFinish();
                                      ModalDialog.alert(__gtexts[__lang].quizfin_close);
                                  }

                              }
                          }
                      ]);
                    }
                }
            }
        }
    };
});
