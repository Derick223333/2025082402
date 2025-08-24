
class SeatingArrangement {
  constructor() {
    this.students = [];
    this.rows = 4;
    this.cols = 6;
    this.initializeElements();
    this.addEventListeners();
  }

  initializeElements() {
    this.studentListInput = document.getElementById('studentList');
    this.rowsInput = document.getElementById('rows');
    this.colsInput = document.getElementById('cols');
    this.arrangeBtn = document.getElementById('arrangeBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.classroom = document.getElementById('classroom');
  }

  addEventListeners() {
    this.arrangeBtn.addEventListener('click', () => this.arrangeSeating());
    this.resetBtn.addEventListener('click', () => this.reset());
    
    this.rowsInput.addEventListener('change', () => this.updateGridSize());
    this.colsInput.addEventListener('change', () => this.updateGridSize());
  }

  updateGridSize() {
    this.rows = parseInt(this.rowsInput.value) || 4;
    this.cols = parseInt(this.colsInput.value) || 6;
  }

  parseStudentList() {
    const input = this.studentListInput.value.trim();
    if (!input) {
      alert('학생 명단을 입력해주세요!');
      return false;
    }

    this.students = input
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (this.students.length === 0) {
      alert('유효한 학생 이름을 입력해주세요!');
      return false;
    }

    const totalSeats = this.rows * this.cols;
    if (this.students.length > totalSeats) {
      alert(`학생 수(${this.students.length}명)가 전체 자리 수(${totalSeats}개)보다 많습니다!`);
      return false;
    }

    return true;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  arrangeSeating() {
    if (!this.parseStudentList()) {
      return;
    }

    this.updateGridSize();
    const shuffledStudents = this.shuffleArray(this.students);
    this.renderClassroom(shuffledStudents);
  }

  renderClassroom(students) {
    this.classroom.innerHTML = '';
    this.classroom.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    this.classroom.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

    const totalSeats = this.rows * this.cols;
    
    for (let i = 0; i < totalSeats; i++) {
      const desk = document.createElement('div');
      desk.className = 'desk';
      
      if (i < students.length) {
        desk.textContent = students[i];
        desk.classList.add('occupied');
      } else {
        desk.textContent = '빈 자리';
        desk.classList.add('empty');
      }
      
      this.classroom.appendChild(desk);
    }
  }

  reset() {
    this.studentListInput.value = '';
    this.rowsInput.value = '4';
    this.colsInput.value = '6';
    this.classroom.innerHTML = '';
    this.students = [];
    this.rows = 4;
    this.cols = 6;
  }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
  new SeatingArrangement();
});

// 샘플 데이터 로드 기능 (개발용)
function loadSampleData() {
  const sampleStudents = [
    '김철수', '이영희', '박민수', '최지원', '정다은', '한상우',
    '송미나', '장준호', '오세린', '권태현', '임소영', '배진우',
    '윤채린', '서동혁', '홍예진', '조민석', '강은비', '노현수'
  ];
  
  document.getElementById('studentList').value = sampleStudents.join('\n');
}

// 전역 함수로 노출 (콘솔에서 테스트용)
window.loadSampleData = loadSampleData;
