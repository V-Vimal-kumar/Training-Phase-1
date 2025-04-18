function AdvArray2() {
    const students = [
        { name: "vk", age: 22, grades: [85, 90, 88] },
        { name: "ak", age: 19, grades: [70, 75, 72] },
        { name: "vs", age: 21, grades: [95, 92, 98] },
        { name: "pk", age: 18, grades: [65, 68, 60] },
      ];
      
      const studentNames = students.map(student => student.name);
      console.log("Student Names:", studentNames);
      
      const olderStudents = students.filter(student => student.age > 20);
      console.log("Students older than 20:", olderStudents);
      
      const totalGrades = students.reduce((sum, student) => sum + student.grades.reduce((a, b) => a + b, 0) / student.grades.length, 0);
      const avgGradeAll = totalGrades / students.length;
      console.log("Average grade of all students:", avgGradeAll.toFixed(2));
      
      const avgGradeOlderStudents = students
        .filter(student => student.age > 20)
        .map(student => student.grades.reduce((a, b) => a + b, 0) / student.grades.length)
        .reduce((sum, grade, _, arr) => sum + grade / arr.length, 0);
      
      console.log("Average grade of students older than 20:", avgGradeOlderStudents.toFixed(2));
      
}

export default AdvArray2