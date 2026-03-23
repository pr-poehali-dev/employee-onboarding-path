import { useState } from "react";
import Icon from "@/components/ui/icon";

type RoleKey = "hr" | "manager" | "buddy" | "employee";

interface Task {
  role: RoleKey;
  text: string;
}

interface DecisionBranch {
  label: string;
  text: string;
  icon: string;
  color: string;
}

interface Step {
  id: number;
  icon: string;
  title: string;
  period: string;
  color: string;
  tasks: Task[];
  decision?: {
    question: string;
    yes: DecisionBranch;
    no: DecisionBranch;
  };
}

const roles: Record<RoleKey, { label: string; color: string; bg: string; icon: string }> = {
  hr: { label: "HR", color: "#6366F1", bg: "#EEF2FF", icon: "UserCheck" },
  manager: { label: "Руководитель", color: "#D97706", bg: "#FFFBEB", icon: "Briefcase" },
  buddy: { label: "Бадди", color: "#059669", bg: "#ECFDF5", icon: "Heart" },
  employee: { label: "Сотрудник", color: "#0891B2", bg: "#ECFEFF", icon: "User" },
};

const steps: Step[] = [
  {
    id: 1,
    icon: "Send",
    title: "Пребординг",
    period: "До выхода на работу",
    color: "#C8D8E8",
    tasks: [
      { role: "hr", text: "Высылает перечень документов для оформления" },
      { role: "hr", text: "Отправляет вопросы для поста-представления" },
      { role: "hr", text: "Информирует руководителя о дате выхода сотрудника" },
      { role: "hr", text: 'Планирует встречу «1-й день: ФИО» — руководитель + новичок' },
      { role: "manager", text: "Высылает HR задачи на испытательный срок" },
    ],
  },
  {
    id: 2,
    icon: "CalendarCheck",
    title: "Первый день",
    period: "День 1",
    color: "#D4E8D4",
    tasks: [
      { role: "hr", text: "Проводит экскурсию по офису" },
      { role: "hr", text: "Передаёт сотрудника на оформление, затем руководителю на встречу" },
      { role: "hr", text: 'Назначает встречи по итогам 1, 2 и 3 месяцев: «1-й месяц: ФИО», «2-й месяц: ФИО», «3-й месяц: ФИО»' },
      { role: "manager", text: "Знакомит новичка с командой" },
      { role: "manager", text: "Выдаёт задачи на испытательный срок" },
      { role: "buddy", text: "Знакомится лично с новичком" },
      { role: "buddy", text: "Совместный обед" },
      { role: "buddy", text: "Отвечает на бытовые вопросы" },
    ],
  },
  {
    id: 3,
    icon: "Rocket",
    title: "Онбординг",
    period: "Первая неделя",
    color: "#E8D4C8",
    tasks: [
      { role: "hr", text: "Проводит опрос по итогам первой недели" },
      { role: "manager", text: "Короткие ежедневные check-in встречи" },
      { role: "buddy", text: "Помощь с интеграцией в коллектив" },
    ],
  },
  {
    id: 4,
    icon: "Calendar",
    title: "Месяц 1",
    period: "По итогам 1-го месяца",
    color: "#E8E4C8",
    tasks: [
      { role: "hr", text: "Опрос по итогам первого месяца" },
      { role: "hr", text: "При необходимости — 2 дополнительные встречи: новичок + руководитель" },
      { role: "manager", text: "Встреча с обратной связью по итогам месяца" },
      { role: "manager", text: "Фиксация выполненных/невыполненных задач в почте" },
      { role: "buddy", text: "Обратная связь руководителю и HR" },
    ],
  },
  {
    id: 5,
    icon: "Calendar",
    title: "Месяц 2",
    period: "По итогам 2-го месяца",
    color: "#D4C8E8",
    tasks: [
      { role: "hr", text: "Опрос по итогам второго месяца" },
      { role: "hr", text: "При необходимости — 2 дополнительные встречи: новичок + руководитель" },
      { role: "manager", text: "Встреча с обратной связью по итогам месяца" },
      { role: "manager", text: "Фиксация выполненных/невыполненных задач в почте" },
      { role: "buddy", text: "Обратная связь руководителю и HR" },
    ],
    decision: {
      question: "Обратная связь после 2-го месяца положительная?",
      yes: {
        label: "Да",
        text: "Самостоятельная работа, участие в проектах",
        icon: "ThumbsUp",
        color: "#059669",
      },
      no: {
        label: "Нет",
        text: "Руководитель корректирует план совместно с HR, после исправления — самостоятельная работа",
        icon: "AlertTriangle",
        color: "#D97706",
      },
    },
  },
  {
    id: 6,
    icon: "ClipboardList",
    title: "За неделю до завершения ИС",
    period: "~2,5 месяца",
    color: "#E8C8D4",
    tasks: [
      { role: "manager", text: "Промежуточный опрос по результатам сотрудника" },
    ],
  },
  {
    id: 7,
    icon: "Award",
    title: "Итоговая оценка",
    period: "Конец испытательного срока",
    color: "#C8E8D8",
    tasks: [
      { role: "employee", text: "Самооценка по итогам испытательного срока" },
      { role: "manager", text: "Оценка сотрудника по итогам испытательного срока" },
      { role: "hr", text: "Формирование итогового решения" },
    ],
    decision: {
      question: "Испытательный срок пройден?",
      yes: {
        label: "Да",
        text: "ИС пройден успешно: welcome-pack + поздравительное письмо на почту сотрудника",
        icon: "PartyPopper",
        color: "#059669",
      },
      no: {
        label: "Нет",
        text: "Расторжение трудового договора",
        icon: "XCircle",
        color: "#DC2626",
      },
    },
  },
];

export default function Index() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeRole, setActiveRole] = useState<RoleKey | null>(null);

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleStep = (id: number) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  const progress = Math.round((completed.length / steps.length) * 100);

  const filteredTasks = (tasks: Task[]) => {
    if (!activeRole) return tasks;
    return tasks.filter((t) => t.role === activeRole);
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "#F7F6F3", color: "#1A1A1A" }}>
      <style>{`
        .step-card {
          background: #FFFFFF;
          border: 1px solid #E0DDD6;
          border-radius: 12px;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .step-card:hover {
          border-color: #C0BDB6;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }
        .step-card.active {
          border-color: #1A1A1A;
          box-shadow: 0 6px 32px rgba(0,0,0,0.1);
        }
        .step-card.done { background: #FAFAF8; opacity: 0.72; }
        .icon-box {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .check-btn {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid #E0DDD6; background: transparent;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: all 0.2s ease; flex-shrink: 0;
        }
        .check-btn:hover { border-color: #2D7D4F; background: #e8f5ed; }
        .check-btn.checked { background: #2D7D4F; border-color: #2D7D4F; }
        .detail-panel { animation: expand-panel 0.3s ease-out forwards; }
        @keyframes expand-panel {
          from { opacity: 0; max-height: 0; overflow: hidden; }
          to { opacity: 1; max-height: 900px; overflow: visible; }
        }
        .onb-tag {
          display: inline-flex; align-items: center; padding: 3px 10px;
          border-radius: 20px; font-size: 12px; font-weight: 500;
          background: #F0EFE9; color: #8A8A8A; border: 1px solid #E0DDD6; white-space: nowrap;
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-animate { animation: card-in 0.4s ease-out forwards; opacity: 0; }
        .progress-bar-fill {
          height: 100%; background: #1A1A1A; border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .role-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 12px; border-radius: 20px; font-size: 12px;
          font-weight: 500; cursor: pointer; border: 1px solid transparent;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .role-pill:hover { opacity: 0.85; }
        .role-pill.active-pill { border-color: currentColor; box-shadow: 0 0 0 1px currentColor; }
        .task-row {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 0; border-bottom: 1px solid #F0EFE9;
          animation: fadeRow 0.2s ease forwards; opacity: 0;
        }
        .task-row:last-child { border-bottom: none; }
        @keyframes fadeRow {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .role-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
        }
        .decision-box {
          border-radius: 10px; padding: 16px; margin-top: 12px;
          border: 1px dashed #D0CDC6; background: #FAFAF8;
        }
        .decision-branch {
          border-radius: 8px; padding: 12px; margin-top: 8px;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .connector-line {
          width: 1px; height: 16px; margin-left: 27px;
          background: linear-gradient(to bottom, #E0DDD6, transparent);
        }
      `}</style>

      {/* Header */}
      <header className="pt-14 pb-8 px-6 max-w-2xl mx-auto">
        <p className="text-xs font-medium mb-4"
          style={{ letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A8A8A" }}>
          Трек адаптации сотрудника
        </p>
        <h1 className="font-cormorant text-5xl font-medium leading-tight mb-3" style={{ color: "#1A1A1A" }}>
          Путь нового<br /><span className="italic">сотрудника</span>
        </h1>
        <p className="text-base leading-relaxed max-w-md" style={{ color: "#8A8A8A" }}>
          Интерактивная карта адаптации — от пребординга до завершения испытательного срока. Нажимайте на этапы, чтобы увидеть задачи каждой роли.
        </p>
      </header>

      {/* Role filter */}
      <div className="px-6 max-w-2xl mx-auto mb-4">
        <p className="text-xs font-medium mb-2.5" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8A8A" }}>
          Фильтр по роли
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`role-pill ${!activeRole ? "active-pill" : ""}`}
            style={{ background: !activeRole ? "#1A1A1A" : "#F0EFE9", color: !activeRole ? "#fff" : "#8A8A8A" }}
            onClick={() => setActiveRole(null)}
          >
            Все роли
          </button>
          {(Object.keys(roles) as RoleKey[]).map((key) => (
            <button
              key={key}
              className={`role-pill ${activeRole === key ? "active-pill" : ""}`}
              style={{
                background: activeRole === key ? roles[key].bg : "#F0EFE9",
                color: activeRole === key ? roles[key].color : "#8A8A8A",
              }}
              onClick={() => setActiveRole(activeRole === key ? null : key)}
            >
              <Icon name={roles[key].icon} size={12} />
              {roles[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 max-w-2xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: "#8A8A8A" }}>Прогресс</span>
          <span className="text-sm font-semibold">{completed.length} из {steps.length}</span>
        </div>
        <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: "#E0DDD6" }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        {completed.length === steps.length && (
          <p className="mt-3 text-sm font-medium flex items-center gap-2" style={{ color: "#2D7D4F" }}>
            <Icon name="PartyPopper" size={15} />
            Все этапы пройдены — сотрудник полностью адаптирован!
          </p>
        )}
      </div>

      {/* Steps */}
      <main className="px-6 max-w-2xl mx-auto pb-20">
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const isCompleted = completed.includes(step.id);
            const isActive = activeStep === step.id;
            const visibleTasks = filteredTasks(step.tasks);

            return (
              <div key={step.id} className="relative">
                {index > 0 && <div className="connector-line" />}

                <div
                  className={`step-card card-animate${isActive ? " active" : ""}${isCompleted ? " done" : ""}`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className="icon-box" style={{ background: step.color }}>
                      {isCompleted
                        ? <Icon name="Check" size={18} style={{ color: "#2D7D4F" }} />
                        : <Icon name={step.icon} size={18} style={{ color: "#1A1A1A" }} />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="font-semibold text-base" style={{
                          color: isCompleted ? "#8A8A8A" : "#1A1A1A",
                          textDecoration: isCompleted ? "line-through" : "none",
                        }}>
                          {step.title}
                        </h3>
                        <span className="onb-tag">{step.period}</span>
                      </div>
                      <p className="text-sm truncate" style={{ color: "#8A8A8A" }}>
                        {step.tasks.length} {step.tasks.length === 1 ? "задача" : step.tasks.length < 5 ? "задачи" : "задач"}
                        {" · "}
                        {[...new Set(step.tasks.map(t => roles[t.role].label))].join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className={`check-btn${isCompleted ? " checked" : ""}`}
                        onClick={(e) => toggleComplete(step.id, e)}
                        title={isCompleted ? "Снять отметку" : "Отметить выполненным"}
                      >
                        {isCompleted && <Icon name="Check" size={12} style={{ color: "#fff" }} />}
                      </button>
                      <Icon name={isActive ? "ChevronUp" : "ChevronDown"} size={17} style={{ color: "#8A8A8A" }} />
                    </div>
                  </div>

                  {isActive && (
                    <div className="detail-panel" style={{ borderTop: "1px solid #E0DDD6" }}>
                      <div className="p-5 pt-4">
                        {visibleTasks.length === 0 ? (
                          <p className="text-sm" style={{ color: "#B0ADA6" }}>
                            Нет задач для выбранной роли на этом этапе
                          </p>
                        ) : (
                          <div>
                            {visibleTasks.map((task, ti) => (
                              <div
                                key={ti}
                                className="task-row"
                                style={{ animationDelay: `${ti * 0.05}s` }}
                              >
                                <div className="role-dot" style={{ background: roles[task.role].color }} />
                                <div className="flex-1">
                                  <span className="text-xs font-medium mr-2" style={{ color: roles[task.role].color }}>
                                    {roles[task.role].label}
                                  </span>
                                  <span className="text-sm" style={{ color: "#3A3A3A" }}>{task.text}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {step.decision && (
                          <div className="decision-box" onClick={(e) => e.stopPropagation()}>
                            <p className="text-sm font-semibold flex items-center gap-2 mb-3" style={{ color: "#1A1A1A" }}>
                              <Icon name="GitFork" size={15} style={{ color: "#8A8A8A" }} />
                              {step.decision.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="decision-branch" style={{ background: step.decision.yes.color + "10", border: `1px solid ${step.decision.yes.color}30` }}>
                                <Icon name={step.decision.yes.icon} size={16} style={{ color: step.decision.yes.color, flexShrink: 0, marginTop: 2 }} />
                                <div>
                                  <p className="text-xs font-semibold mb-1" style={{ color: step.decision.yes.color }}>
                                    {step.decision.yes.label}
                                  </p>
                                  <p className="text-xs" style={{ color: "#5A5A5A" }}>
                                    {step.decision.yes.text}
                                  </p>
                                </div>
                              </div>
                              <div className="decision-branch" style={{ background: step.decision.no.color + "10", border: `1px solid ${step.decision.no.color}30` }}>
                                <Icon name={step.decision.no.icon} size={16} style={{ color: step.decision.no.color, flexShrink: 0, marginTop: 2 }} />
                                <div>
                                  <p className="text-xs font-semibold mb-1" style={{ color: step.decision.no.color }}>
                                    {step.decision.no.label}
                                  </p>
                                  <p className="text-xs" style={{ color: "#5A5A5A" }}>
                                    {step.decision.no.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid #E0DDD6" }}>
        <p className="text-xs" style={{ color: "#8A8A8A" }}>
          Остались вопросы? Напишите в HR —{" "}
          <a href="mailto:hr@company.ru" className="underline hover:text-[#1A1A1A] transition-colors" style={{ color: "#8A8A8A" }}>
            hr@company.ru
          </a>
        </p>
      </footer>
    </div>
  );
}
