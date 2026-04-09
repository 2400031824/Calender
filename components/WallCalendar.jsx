'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { format, getMonth, getYear, isWithinInterval, parseISO } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import CalendarGrid from './CalendarGrid';
import DailyNotesDrawer from './DailyNotesDrawer';
import BackgroundMotion from './BackgroundMotion';
import HeroImage from './HeroImage';
import HolidaysBlock from './HolidaysBlock';
import HolidaysModal from './HolidaysModal';
import MonthlyNotes from './MonthlyNotes';
import PageCurlCorner from './PageCurlCorner';
import SpiralBinding from './SpiralBinding';
import useCalendarState from '../hooks/useCalendarState';
import useHolidays from '../hooks/useHolidays';
import useNotes from '../hooks/useNotes';
import usePageFlip from '../hooks/usePageFlip';
import { MONTH_DATA } from '../data/monthImages';
import { QUOTES } from '../data/monthQuotes';

const flipVariants = {
  initial: (dir) => ({
    rotateX: dir === 'next' ? 90 : -90,
    opacity: 0,
    scale: 0.97,
    transformOrigin: dir === 'next' ? 'top center' : 'bottom center'
  }),
  animate: {
    rotateX: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: [0.45, 0, 0.55, 1]
    }
  },
  exit: (dir) => ({
    rotateX: dir === 'next' ? -90 : 90,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.35, ease: 'easeIn' }
  })
};

export default function WallCalendar() {
  const [isWidgetMode, setIsWidgetMode] = useState(false);
  const {
    currentMonth,
    setCurrentMonth,
    selectedSingleDate,
    setSelectedSingleDate,
    rangeStart,
    rangeEnd,
    previewRange,
    setHoverDate,
    handleDateClick,
    clearSelection,
    selectRange,
    selectSingle
  } = useCalendarState();

  const { isFlipping, direction, flipNext, flipPrev } = usePageFlip(setCurrentMonth);
  const { monthHolidays, holidayMap } = useHolidays(currentMonth);
  const {
    activeDayNote,
    updateActiveDayNote,
    activeRangeNote,
    updateActiveRangeNote,
    activeDayKey,
    activeRangeKey,
    activeDayPinned,
    activeRangePinned,
    setPinned,
    clearNote,
    commitmentRows,
    dayNoteDateSet,
    rangeNoteDateSet,
    bumpVersion
  } = useNotes({
    currentMonth,
    selectedSingleDate,
    rangeStart,
    rangeEnd
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Holidays');
  const [modalHolidays, setModalHolidays] = useState([]);
  const [isOverlayMode, setIsOverlayMode] = useState(false);
  const gridRef = useRef(null);

  const monthIndex = getMonth(currentMonth);
  const year = getYear(currentMonth);
  const monthData = MONTH_DATA[monthIndex];
  const shouldPauseMotion = isFlipping || modalOpen;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsWidgetMode(params.get('widget') === '1');
      if (window.widgetAPI?.getOverlayMode) {
        window.widgetAPI.getOverlayMode().then((value) => setIsOverlayMode(!!value)).catch(() => setIsOverlayMode(false));
      } else {
        setIsOverlayMode(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.widgetAPI?.onOverlayModeChanged) return undefined;
    return window.widgetAPI.onOverlayModeChanged((value) => {
      setIsOverlayMode(!!value);
    });
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (!gridRef.current) return;
      const target = event.target;
      if (gridRef.current.contains(target)) return;
      if (target.closest('[data-keep-selection="true"]')) return;
      clearSelection();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [clearSelection]);

  const openMonthHolidayModal = () => {
    setModalTitle(`${format(currentMonth, 'MMMM yyyy')} Holidays`);
    setModalHolidays(monthHolidays);
    setModalOpen(true);
  };

  const openHolidayFromDate = (dateKey, holidayName) => {
    if (!holidayName) return;
    setModalTitle('Holiday');
    setModalHolidays([
      {
        date: dateKey,
        label: format(parseISO(dateKey), 'MMM d'),
        name: holidayName
      }
    ]);
    setModalOpen(true);
  };

  const drawerMode = useMemo(() => {
    if (rangeStart && rangeEnd) {
      if (selectedSingleDate && isWithinInterval(selectedSingleDate, { start: rangeStart, end: rangeEnd })) {
        return 'dayWithinRange';
      }
      return 'range';
    }

    if (selectedSingleDate) return 'daily';
    return null;
  }, [rangeEnd, rangeStart, selectedSingleDate]);

  const drawerOpen = !!drawerMode;

  const idleAnimation = useMemo(() => {
    if (shouldPauseMotion) return { y: 0, rotate: 0 };
    return { y: [0, -4, 0], rotate: [0, 0.3, -0.3, 0] };
  }, [shouldPauseMotion]);

  const handleOpenEntry = (entry) => {
    if (entry.type === 'range') {
      selectRange(entry.start, entry.end);
      setSelectedSingleDate(null);
      return;
    }
    if (entry.type === 'day') {
      selectSingle(entry.date);
    }
  };

  const handleSave = () => {
    bumpVersion();
  };

  const handleTogglePinned = (type, pinned) => {
    if (type === 'range' && activeRangeKey) {
      setPinned(activeRangeKey, pinned);
      return;
    }
    if (type === 'day' && activeDayKey) {
      setPinned(activeDayKey, pinned);
    }
  };

  const handleClear = (type) => {
    if (type === 'range' && activeRangeKey) {
      clearNote(activeRangeKey);
      return;
    }
    if (type === 'day' && activeDayKey) {
      clearNote(activeDayKey);
    }
  };

  const hideToTray = () => {
    if (typeof window !== 'undefined' && window.widgetAPI?.hideToTray) {
      window.widgetAPI.hideToTray();
    }
  };

  const restoreWidget = () => {
    if (typeof window !== 'undefined' && window.widgetAPI?.restoreWidget) {
      window.widgetAPI.restoreWidget();
    }
  };

  const toggleOverlay = async () => {
    if (typeof window !== 'undefined' && window.widgetAPI?.setOverlayMode) {
      await window.widgetAPI.setOverlayMode(!isOverlayMode);
      return;
    }
    if (typeof window !== 'undefined' && window.widgetAPI?.toggleOverlay) {
      window.widgetAPI.toggleOverlay();
    }
  };

  return (
    <BackgroundMotion image={monthData.background} paused={shouldPauseMotion}>
      <div className={`calendar-wrapper ${isWidgetMode ? 'widget-mode' : ''}`}>
        <motion.div
          className={`calendar-card ${isWidgetMode ? 'widget-card' : ''}`}
          data-keep-selection="true"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {isWidgetMode ? (
            <>
              <div
                className="widget-drag-handle"
                data-keep-selection="true"
                onMouseDown={(event) => event.preventDefault()}
              />
              <div className="widget-toolbar" data-keep-selection="true" data-no-drag="true">
                <button type="button" onClick={toggleOverlay} className="widget-tool-btn">
                  {isOverlayMode ? 'Desktop' : 'Overlay'}
                </button>
                <button type="button" onClick={hideToTray} className="widget-tool-btn">
                  Send to Tray
                </button>
                <button type="button" onClick={restoreWidget} className="widget-tool-btn">
                  Restore
                </button>
              </div>
            </>
          ) : null}
          <motion.div
            animate={idleAnimation}
            transition={{ duration: 7, repeat: shouldPauseMotion ? 0 : Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            <SpiralBinding />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${year}-${monthIndex}`}
                className="calendar-sheet"
                custom={direction}
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
              >
                <HeroImage
                  src={monthData.hero}
                  monthLabel={monthData.name}
                  year={year}
                  accent={monthData.accent}
                  paused={shouldPauseMotion}
                  quote={QUOTES[monthIndex]}
                  monthIndex={monthIndex}
                />

                <div className={`bottom-section ${isWidgetMode ? 'widget-bottom' : ''}`}>
                  <div className={`left-panel ${isWidgetMode ? 'widget-left-panel' : ''}`} data-keep-selection="true">
                    <MonthlyNotes
                      accent={monthData.accent}
                      commitmentRows={commitmentRows}
                      onOpenEntry={handleOpenEntry}
                    />
                    <HolidaysBlock holidays={monthHolidays} onOpen={openMonthHolidayModal} accent={monthData.accent} className="mt-2" />
                  </div>

                  <div className={`right-panel ${isWidgetMode ? 'widget-right-panel' : ''}`}>
                    <CalendarGrid
                      month={currentMonth}
                      selectedSingleDate={selectedSingleDate}
                      rangeStart={rangeStart}
                      rangeEnd={rangeEnd}
                      previewRange={previewRange}
                      accent={monthData.accent}
                      holidayMap={holidayMap}
                      dayNoteDateSet={dayNoteDateSet}
                      rangeNoteDateSet={rangeNoteDateSet}
                      onDateClick={handleDateClick}
                      onHoverDate={setHoverDate}
                      onHolidayOpen={openHolidayFromDate}
                      gridRef={gridRef}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              style={{ background: 'radial-gradient(circle at bottom right, rgba(0,0,0,0.18), transparent 45%)' }}
              animate={isFlipping ? { opacity: [0, 0.25, 0] } : { opacity: 0 }}
              transition={{ duration: 0.52, ease: 'easeInOut' }}
            />

            <PageCurlCorner position="top-right" onClick={flipPrev} disabled={isFlipping} />
            <PageCurlCorner position="bottom-right" onClick={flipNext} disabled={isFlipping} />

            <DailyNotesDrawer
              open={drawerOpen}
              onClose={clearSelection}
              mode={drawerMode}
              date={selectedSingleDate}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              dayNote={activeDayNote}
              rangeNote={activeRangeNote}
              onDayChange={updateActiveDayNote}
              onRangeChange={updateActiveRangeNote}
              dayPinned={activeDayPinned}
              rangePinned={activeRangePinned}
              onTogglePinned={handleTogglePinned}
              onClear={handleClear}
              onSave={handleSave}
              accent={monthData.accent}
            />
          </motion.div>
        </motion.div>

        <HolidaysModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          holidays={modalHolidays}
          accent={monthData.accent}
          title={modalTitle}
        />
      </div>
    </BackgroundMotion>
  );
}
