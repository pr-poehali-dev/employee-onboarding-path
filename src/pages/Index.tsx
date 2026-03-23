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
  hr: { label: "HR", color: "#818CF8", bg: "rgba(129,140,248,0.12)", icon: "UserCheck" },
  manager: { label: "Руководитель", color: "#FBBF24", bg: "rgba(251,191,36,0.12)", icon: "Briefcase" },
  buddy: { label: "Бадди", color: "#34D399", bg: "rgba(52,211,153,0.12)", icon: "Heart" },
  employee: { label: "Сотрудник", color: "#38BDF8", bg: "rgba(56,189,248,0.12)", icon: "User" },
};

const steps: Step[] = [
  {
    id: 1,
    icon: "Send",
    title: "Пребординг",
    period: "До выхода на работу",
    color: "#818CF8",
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
    color: "#34D399",
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
    color: "#FBBF24",
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
    color: "#38BDF8",
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
    color: "#F472B6",
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
        color: "#34D399",
      },
      no: {
        label: "Нет",
        text: "Руководитель корректирует план совместно с HR, после исправления — самостоятельная работа",
        icon: "AlertTriangle",
        color: "#FBBF24",
      },
    },
  },
  {
    id: 6,
    icon: "ClipboardList",
    title: "За неделю до завершения ИС",
    period: "~2,5 месяца",
    color: "#A78BFA",
    tasks: [
      { role: "manager", text: "Промежуточный опрос по результатам сотрудника" },
    ],
  },
  {
    id: 7,
    icon: "Award",
    title: "Итоговая оценка",
    period: "Конец испытательного срока",
    color: "#818CF8",
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
        color: "#34D399",
      },
      no: {
        label: "Нет",
        text: "Расторжение трудового договора",
        icon: "XCircle",
        color: "#F87171",
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
    <div className="min-h-screen font-golos" style={{ background: "#F5F4F9", color: "#1E1E2E" }}>
      <style>{`
        .step-card {
          background: #FFFFFF;
          border: 1px solid #E2E0EC;
          border-radius: 12px;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .step-card:hover {
          border-color: #C8C5D6;
          box-shadow: 0 4px 24px rgba(91,95,230,0.08);
          transform: translateY(-1px);
        }
        .step-card.active {
          border-color: #5B5FE6;
          box-shadow: 0 6px 32px rgba(91,95,230,0.12);
        }
        .step-card.done { background: #FAFAFE; opacity: 0.7; }
        .icon-box {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .check-btn {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid #E2E0EC; background: transparent;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: all 0.2s ease; flex-shrink: 0;
        }
        .check-btn:hover { border-color: #34D399; background: #e8f5ed; }
        .check-btn.checked { background: #34D399; border-color: #34D399; }
        .detail-panel { animation: expand-panel 0.3s ease-out forwards; }
        @keyframes expand-panel {
          from { opacity: 0; max-height: 0; overflow: hidden; }
          to { opacity: 1; max-height: 900px; overflow: visible; }
        }
        .onb-tag {
          display: inline-flex; align-items: center; padding: 3px 10px;
          border-radius: 20px; font-size: 12px; font-weight: 500;
          background: #EEEDFA; color: #6E6B80;
          border: 1px solid #E2E0EC; white-space: nowrap;
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-animate { animation: card-in 0.4s ease-out forwards; opacity: 0; }
        .progress-bar-track {
          height: 3px; width: 100%; border-radius: 4px; overflow: hidden;
          background: #E2E0EC;
        }
        .progress-bar-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, #5B5FE6, #818CF8);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .role-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 12px; border-radius: 20px; font-size: 12px;
          font-weight: 500; cursor: pointer; border: 1px solid transparent;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .role-pill:hover { opacity: 0.85; }
        .role-pill.active-pill { border-color: currentColor; }
        .task-row {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 0; border-bottom: 1px solid #F0EFF5;
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
          border: 1px dashed #D0CDE0; background: #FAFAFE;
        }
        .decision-branch {
          border-radius: 8px; padding: 12px; margin-top: 8px;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .connector-line {
          width: 1px; height: 16px; margin-left: 27px;
          background: linear-gradient(to bottom, #E2E0EC, transparent);
        }
        .verme-logo {
          display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
        }
        .verme-logo-mark {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg, #5B5FE6, #818CF8);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 16px; color: #fff;
        }
        .verme-logo-text {
          font-size: 20px; font-weight: 700; letter-spacing: -0.02em;
          color: #1E1E2E;
        }
        .hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 300px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(91,95,230,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
      `}</style>

      {/* Header */}
      <header className="relative pt-14 pb-8 px-6 max-w-2xl mx-auto overflow-visible">
        <div className="hero-glow" />
        <div className="relative z-10">
          <div className="verme-logo">
            <div className="verme-logo-mark">V</div>
            <span className="verme-logo-text">Verme</span>
          </div>

          <p className="text-xs font-medium mb-4"
            style={{ letterSpacing: "0.2em", textTransform: "uppercase", color: "#5B5FE6" }}>
            Трек адаптации сотрудника
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-3" style={{ color: "#1E1E2E" }}>
            Путь нового<br /><span style={{ color: "#5B5FE6" }}>сотрудника</span>
          </h1>
          <p className="text-base leading-relaxed max-w-md" style={{ color: "#6E6B80" }}>
            Интерактивная карта адаптации — от пребординга до завершения испытательного срока. Нажимайте на этапы, чтобы увидеть задачи каждой роли.
          </p>
        </div>
      </header>

      {/* Role filter */}
      <div className="px-6 max-w-2xl mx-auto mb-4">
        <p className="text-xs font-medium mb-2.5" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: "#6E6B80" }}>
          Фильтр по роли
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`role-pill ${!activeRole ? "active-pill" : ""}`}
            style={{ background: !activeRole ? "#5B5FE6" : "#EEEDFA", color: !activeRole ? "#fff" : "#6E6B80" }}
            onClick={() => setActiveRole(null)}
          >
            Все роли
          </button>
          {(Object.keys(roles) as RoleKey[]).map((key) => (
            <button
              key={key}
              className={`role-pill ${activeRole === key ? "active-pill" : ""}`}
              style={{
                background: activeRole === key ? roles[key].bg : "#EEEDFA",
                color: activeRole === key ? roles[key].color : "#6E6B80",
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
          <span className="text-sm" style={{ color: "#6E6B80" }}>Прогресс</span>
          <span className="text-sm font-semibold" style={{ color: "#1E1E2E" }}>{completed.length} из {steps.length}</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        {completed.length === steps.length && (
          <p className="mt-3 text-sm font-medium flex items-center gap-2" style={{ color: "#34D399" }}>
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
                    <div className="icon-box" style={{ background: step.color + "18" }}>
                      {isCompleted
                        ? <Icon name="Check" size={18} style={{ color: "#34D399" }} />
                        : <Icon name={step.icon} size={18} style={{ color: step.color }} />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="font-semibold text-base" style={{
                          color: isCompleted ? "#9996A8" : "#1E1E2E",
                          textDecoration: isCompleted ? "line-through" : "none",
                        }}>
                          {step.title}
                        </h3>
                        <span className="onb-tag">{step.period}</span>
                      </div>
                      <p className="text-sm truncate" style={{ color: "#8A879A" }}>
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
                      <Icon name={isActive ? "ChevronUp" : "ChevronDown"} size={17} style={{ color: "#8A879A" }} />
                    </div>
                  </div>

                  {isActive && (
                    <div className="detail-panel" style={{ borderTop: "1px solid #E2E0EC" }}>
                      <div className="p-5 pt-4">
                        {visibleTasks.length === 0 ? (
                          <p className="text-sm" style={{ color: "#8A879A" }}>
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
                                  <span className="text-sm" style={{ color: "#3A3850" }}>{task.text}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {step.decision && (
                          <div className="decision-box" onClick={(e) => e.stopPropagation()}>
                            <p className="text-sm font-semibold flex items-center gap-2 mb-3" style={{ color: "#1E1E2E" }}>
                              <Icon name="GitFork" size={15} style={{ color: "#5B5FE6" }} />
                              {step.decision.question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="decision-branch" style={{ background: step.decision.yes.color + "12", border: `1px solid ${step.decision.yes.color}30` }}>
                                <Icon name={step.decision.yes.icon} size={16} style={{ color: step.decision.yes.color, flexShrink: 0, marginTop: 2 }} />
                                <div>
                                  <p className="text-xs font-semibold mb-1" style={{ color: step.decision.yes.color }}>
                                    {step.decision.yes.label}
                                  </p>
                                  <p className="text-xs" style={{ color: "#5A576E" }}>
                                    {step.decision.yes.text}
                                  </p>
                                </div>
                              </div>
                              <div className="decision-branch" style={{ background: step.decision.no.color + "12", border: `1px solid ${step.decision.no.color}30` }}>
                                <Icon name={step.decision.no.icon} size={16} style={{ color: step.decision.no.color, flexShrink: 0, marginTop: 2 }} />
                                <div>
                                  <p className="text-xs font-semibold mb-1" style={{ color: step.decision.no.color }}>
                                    {step.decision.no.label}
                                  </p>
                                  <p className="text-xs" style={{ color: "#5A576E" }}>
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

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid #E2E0EC" }}>
        <p className="text-xs" style={{ color: "#8A879A" }}>
          Остались вопросы? Напишите в HR —{" "}
          <a href="mailto:hr@verme.ru" className="underline transition-colors hover:text-[#5B5FE6]" style={{ color: "#8A879A" }}>
            hr@verme.ru
          </a>
        </p>
      </footer>
    </div>
  );
}