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

interface Contact {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface SubStep {
  id: string;
  icon: string;
  title: string;
  description: string;
  items: string[];
  contact: Contact;
}

interface Step {
  id: number;
  icon: string;
  title: string;
  period: string;
  color: string;
  tasks: Task[];
  subSteps?: SubStep[];
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
    subSteps: [
      {
        id: "2-1",
        icon: "KeyRound",
        title: "Получение логинов и паролей",
        description: "Вы получите учётные данные для входа во все корпоративные системы: почта, CRM, мессенджеры, внутренний портал и прочие сервисы.",
        items: ["Корпоративная почта", "CRM-система", "1С / ERP", "Slack / Teams", "VPN"],
        contact: { name: "Алексей Сидоров", role: "Системный администратор", email: "it@verme.ru", phone: "+7 (900) 123-45-01" },
      },
      {
        id: "2-2",
        icon: "Monitor",
        title: "Выдача оборудования",
        description: "Вам подготовят рабочее оборудование: ноутбук с установленным ПО, монитор, рабочий телефон и необходимые аксессуары.",
        items: ["Ноутбук", "Монитор", "Корпоративный телефон", "Клавиатура и мышь"],
        contact: { name: "Марина Козлова", role: "Офис-менеджер", email: "office@verme.ru", phone: "+7 (900) 123-45-02" },
      },
      {
        id: "2-3",
        icon: "CreditCard",
        title: "Выдача постоянного пропуска",
        description: "Вам оформят постоянный пропуск в здание, ключи от офиса и при необходимости карту парковки.",
        items: ["Пропуск в здание", "Ключ от офиса", "Карта парковки"],
        contact: { name: "Дмитрий Петров", role: "Административный директор", email: "admin@verme.ru", phone: "+7 (900) 123-45-03" },
      },
      {
        id: "2-4",
        icon: "FileText",
        title: "Кадровые документы и политики",
        description: "HR-специалист ознакомит вас с трудовым договором, внутренними регламентами и кодексом корпоративной этики.",
        items: ["Трудовой договор", "Должностная инструкция", "Кодекс этики", "Регламент отпусков"],
        contact: { name: "Ольга Новикова", role: "HR-менеджер", email: "hr@verme.ru", phone: "+7 (900) 123-45-04" },
      },
      {
        id: "2-5",
        icon: "ShieldCheck",
        title: "Обучение правилам ИБ",
        description: "Специалист по ИБ проведёт инструктаж по правилам работы с данными и попросит подписать соглашение о конфиденциальности.",
        items: ["Инструктаж по ИБ", "Политика паролей", "NDA / Соглашение о конфиденциальности"],
        contact: { name: "Игорь Захаров", role: "Специалист по ИБ", email: "security@verme.ru", phone: "+7 (900) 123-45-05" },
      },
      {
        id: "2-6",
        icon: "Users",
        title: "Знакомство с командой",
        description: "1:1 с непосредственным руководителем, знакомство с командой отдела и общий welcome-звонок с коллегами.",
        items: ["1:1 с руководителем", "Встреча с командой", "Welcome-звонок", "Экскурсия по офису"],
        contact: { name: "Елена Громова", role: "Руководитель отдела", email: "manager@verme.ru", phone: "+7 (900) 123-45-06" },
      },
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
  const [activeSubStep, setActiveSubStep] = useState<string | null>(null);

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
        .substep-list {
          margin-top: 16px; border-top: 1px solid #F0EFF5; padding-top: 12px;
        }
        .substep-row {
          border: 1px solid #EEEDFA;
          border-radius: 10px; margin-bottom: 8px; overflow: hidden;
          transition: border-color 0.2s;
        }
        .substep-row:last-child { margin-bottom: 0; }
        .substep-row.open { border-color: #C4C1DF; }
        .substep-header {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; cursor: pointer;
          background: #FAFAFE; transition: background 0.15s;
        }
        .substep-header:hover { background: #F3F2FB; }
        .substep-icon {
          width: 30px; height: 30px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: #EEEDFA; flex-shrink: 0;
        }
        .substep-body {
          padding: 12px 14px 14px;
          border-top: 1px solid #EEEDFA;
          background: #FFFFFF;
          animation: expand-panel 0.25s ease-out forwards;
        }
        .substep-tag {
          display: inline-flex; align-items: center; padding: 2px 8px;
          border-radius: 12px; font-size: 11px; font-weight: 500;
          background: #EEEDFA; color: #6E6B80;
          border: 1px solid #E2E0EC; white-space: nowrap;
        }
        .contact-mini {
          background: #F5F4F9; border-radius: 8px; padding: 10px 12px;
          border: 1px solid #E2E0EC; margin-top: 10px;
        }
        .contact-link-mini {
          color: #8A879A; text-decoration: none; font-size: 12px;
          display: flex; align-items: center; gap: 5px;
          transition: color 0.15s;
        }
        .contact-link-mini:hover { color: #5B5FE6; }
        .write-btn-mini {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 500; color: #5B5FE6;
          background: #EEEDFA; border: 1px solid #C4C1DF;
          border-radius: 6px; padding: 5px 10px; cursor: pointer;
          transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
        }
        .write-btn-mini:hover { background: #5B5FE6; color: #fff; border-color: #5B5FE6; }
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

                        {step.subSteps && (
                          <div className="substep-list" onClick={(e) => e.stopPropagation()}>
                            <p className="text-xs font-semibold mb-3" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A879A" }}>
                              Шаги первого дня
                            </p>
                            {step.subSteps.map((sub) => {
                              const isSubOpen = activeSubStep === sub.id;
                              return (
                                <div key={sub.id} className={`substep-row${isSubOpen ? " open" : ""}`}>
                                  <div className="substep-header" onClick={() => setActiveSubStep(isSubOpen ? null : sub.id)}>
                                    <div className="substep-icon">
                                      <Icon name={sub.icon} size={15} style={{ color: "#5B5FE6" }} />
                                    </div>
                                    <span className="text-sm font-medium flex-1" style={{ color: "#1E1E2E" }}>{sub.title}</span>
                                    <Icon name={isSubOpen ? "ChevronUp" : "ChevronDown"} size={15} style={{ color: "#8A879A" }} />
                                  </div>
                                  {isSubOpen && (
                                    <div className="substep-body">
                                      <p className="text-sm mb-3" style={{ color: "#6E6B80" }}>{sub.description}</p>
                                      <div className="flex flex-wrap gap-1.5 mb-3">
                                        {sub.items.map((item) => (
                                          <span key={item} className="substep-tag">{item}</span>
                                        ))}
                                      </div>
                                      <div className="contact-mini">
                                        <div className="flex items-start justify-between gap-3">
                                          <div>
                                            <p className="text-sm font-semibold mb-0.5" style={{ color: "#1E1E2E" }}>{sub.contact.name}</p>
                                            <p className="text-xs mb-2" style={{ color: "#8A879A" }}>{sub.contact.role}</p>
                                            <div className="flex flex-col gap-1">
                                              <a href={`mailto:${sub.contact.email}`} className="contact-link-mini">
                                                <Icon name="Mail" size={12} />{sub.contact.email}
                                              </a>
                                              <a href={`tel:${sub.contact.phone}`} className="contact-link-mini">
                                                <Icon name="Phone" size={12} />{sub.contact.phone}
                                              </a>
                                            </div>
                                          </div>
                                          <button className="write-btn-mini" onClick={() => { window.location.href = `mailto:${sub.contact.email}`; }}>
                                            <Icon name="Send" size={11} />Написать
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
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